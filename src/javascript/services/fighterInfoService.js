import FighterService from './fightersService';

const fighterDetailsMap = new Map();

export default async function getFighterInfo(fighterId) {
    const id = String(fighterId);

    if (fighterDetailsMap.has(id)) {
        return fighterDetailsMap.get(id);
    }

    const fighter = await FighterService.getFighterDetails(id);

    fighterDetailsMap.set(id, fighter);
    return fighter;
}
