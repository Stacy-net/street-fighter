import showModal from './modal';

export default async function showWinnerModal(fighter) {
    if (!fighter) {
        console.error('Fighter not found:', fighter);
        return;
    }

    const titleElement = document.createElement('h2');
    titleElement.innerText = `${fighter.name}`;

    const imageElement = document.createElement('img');
    imageElement.src = fighter.source;
    imageElement.alt = fighter.name;

    const bodyElement = document.createElement('div');
    bodyElement.append(titleElement, imageElement);

    showModal({ title: 'Winner', bodyElement });
}
