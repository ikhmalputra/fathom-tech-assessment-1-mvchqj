import 'flex-layout-attribute';
import './style.css';

import eventBus from './event-bus';

function attachPane(pane: HTMLElement) {
    const subscription = pane.dataset.subscription as keyof typeof eventBus;

    const inputElement = pane.querySelector('.event-pane__input');
    const outputElement = pane.querySelector('.event-pane__output');
    const triggerElements = Array.from(
        pane.querySelectorAll('.event-pane__trigger')
    ) as HTMLElement[];

    triggerElements.forEach((trigger) => {
        eventBus[subscription](trigger.dataset.event, (value) => {
            const outputLine = document.createElement('div');

            outputLine.innerText = `${trigger.dataset.event}: ${
                value || 'no arg'
            }`;
            outputElement?.append(outputLine);
        });
        trigger.addEventListener('click', () => {
            eventBus.emit(trigger.dataset.event, inputElement.value);
        });
    });
}

function main() {
    Array.from(document.querySelectorAll('.event-pane')).forEach((pane) =>
        attachPane(pane as HTMLElement)
    );
}

main();
