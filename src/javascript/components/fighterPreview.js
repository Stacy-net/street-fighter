import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
	const { source, name } = fighter;
	const attributes = {
		src: source,
		title: name,
		alt: name,
	};
	const imgElement = createElement({
		tagName: 'img',
		className: 'fighter-preview___img',
		attributes,
	});

	return imgElement;
}

export function createFighterPreview(fighter, position) {
	if (!fighter) {
		const emptyElement = createElement({
			tagName: 'div',
			className: 'fighter-preview___empty',
		});
		return emptyElement;
	}
	const positionClassName =
		position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
	const fighterElement = createElement({
		tagName: 'div',
		className: `fighter-preview___root ${positionClassName}`,
	});

	const fighterImage = createFighterImage(fighter);

	const name = createElement({
		tagName: 'h4',
		className: 'fighter-preview___name',
	});
	name.innerText = fighter.name;

	const health = createElement({
		tagName: 'p',
		className: 'fighter-preview___stat',
	});
	health.innerText = `Health: ${fighter.health}`;

	const attack = createElement({
		tagName: 'p',
		className: 'fighter-preview___stat',
	});
	attack.innerText = `Attack: ${fighter.attack}`;

	const defense = createElement({
		tagName: 'p',
		className: 'fighter-preview___stat',
	});
	defense.innerText = `Defense: ${fighter.defense}`;

	const infoContainer = createElement({
		tagName: 'div',
		className: 'fighter-preview___info',
	});
	infoContainer.append(name, health, attack, defense);

	fighterElement.append(fighterImage, infoContainer);

	return fighterElement;
}
