import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface Session {
	id: string;
	url: string;
	timestamp: number;
}

export const activeSession = writable<Session | null>(null);

export function saveSession(props: Session) {
	activeSession.set(props);
	console.log(`Active session with the id ${props.id} was saved in local storage.`);
}

export function resetSession() {
	activeSession.set(null);
	console.log('Active session in local storage was reset.');
}

// NOTE: TO WORK WITH LOCAL STORAGE WE NEED TO CHECK IF WE ARE IN BROWSER ENV:
if (browser) {
	const localStorageActiveSession = localStorage.getItem('doosha-active-session');
	console.log('Active session saved in local storage:', localStorageActiveSession);

	// if exists, populate cart storage:
	if (localStorageActiveSession) {
		const storedSession: Session | null = JSON.parse(localStorageActiveSession);

		// check saved active session $ reset if needed:
		if (storedSession && storedSession.timestamp && storedSession.timestamp < Date.now()) {
			console.log(`Saved active session ${storedSession.id} is expired now => reset store...`);
			resetSession();
		} else {
			activeSession.set(storedSession);
		}
	}

	activeSession.subscribe((session) => {
		console.log('active session store update:', session);
		// update local storage:
		localStorage['doosha-active-session'] = JSON.stringify(session);
	});
}
