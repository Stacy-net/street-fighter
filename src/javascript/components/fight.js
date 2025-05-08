import controls from '../../constants/controls';

export function getHitPower(fighter) {
	return fighter.attack * (Math.random() + 1);
}

export function getBlockPower(fighter) {
	return fighter.defense * (Math.random() + 1);
}

export function getDamage(attacker, defender) {
	return Math.max(getHitPower(attacker) - getBlockPower(defender), 0);
}

export default async function fight(firstFighter, secondFighter) {
	return new Promise((resolve) => {
		let fighter1Health = firstFighter.health;
		let fighter2Health = secondFighter.health;
		const fighter1Bar = document.getElementById('left-fighter-indicator');
		const fighter2Bar = document.getElementById('right-fighter-indicator');

		if (!fighter1Bar || !fighter2Bar) {
			console.error('Health bar elements not found');
			return;
		}

		const pressedKeys = new Set();
		const criticalHitCooldowns = {
			[firstFighter._id]: 0,
			[secondFighter._id]: 0,
		};

		let handleKeyDown;
		let handleKeyUp;

		const updateHealthBar = (barEl, currentHealth, initialHealth) => {
			const percent = (currentHealth / initialHealth) * 100;
			const clonedStyle = { ...barEl.style };
			clonedStyle.width = `${percent}%`;
			barEl.setAttribute('style', `width: ${percent}%`);
		};

		const endFight = (winner) => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
			resolve(winner);
		};

		const handleAttack = (attacker, defender, isCritical = false) => {
			const damage = isCritical
				? 2 * attacker.attack
				: getDamage(attacker, defender);
			if (defender === firstFighter) {
				fighter1Health -= damage;
				updateHealthBar(fighter1Bar, fighter1Health, firstFighter.health);
				if (fighter1Health <= 0) endFight(secondFighter);
			} else {
				fighter2Health -= damage;
				updateHealthBar(fighter2Bar, fighter2Health, secondFighter.health);
				if (fighter2Health <= 0) endFight(firstFighter);
			}
		};

		handleKeyDown = (event) => {
			pressedKeys.add(event.code);
			const now = Date.now();
			const canCrit1 = controls.PlayerOneCriticalHitCombination.every((code) =>
				pressedKeys.has(code)
			);
			const canCrit2 = controls.PlayerTwoCriticalHitCombination.every((code) =>
				pressedKeys.has(code)
			);

			if (canCrit1 && now - criticalHitCooldowns[firstFighter._id] > 10000) {
				handleAttack(firstFighter, secondFighter, true);
				criticalHitCooldowns[firstFighter._id] = now;
			} else if (
				canCrit2 &&
				now - criticalHitCooldowns[secondFighter._id] > 10000
			) {
				handleAttack(secondFighter, firstFighter, true);
				criticalHitCooldowns[secondFighter._id] = now;
			} else if (
				event.code === controls.PlayerOneAttack &&
				!pressedKeys.has(controls.PlayerOneBlock)
			) {
				handleAttack(firstFighter, secondFighter);
			} else if (
				event.code === controls.PlayerTwoAttack &&
				!pressedKeys.has(controls.PlayerTwoBlock)
			) {
				handleAttack(secondFighter, firstFighter);
			}
		};

		handleKeyUp = (event) => {
			pressedKeys.delete(event.code);
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);
	});
}
