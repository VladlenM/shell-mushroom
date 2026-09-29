import type { EventName } from '@shop/contracts';
import { mount } from '../../src';
import { createControls } from './controls';
import { createMockBus } from './mockBus';
import './styles.css';

const widgetElement = document.getElementById('widget')!;
const controlsElement = document.getElementById('controls')!;
const eventsElement = document.getElementById('events')!;

function logEvent(topic: EventName, payload: unknown) {
  const time = new Date().toLocaleTimeString();
  const line = `${time}  ${topic}  ${JSON.stringify(payload)}`;
  eventsElement.textContent = `${line}\n${eventsElement.textContent}`;
}

const bus = createMockBus(logEvent);

controlsElement.append(...createControls(bus));
mount(widgetElement, { bus });
