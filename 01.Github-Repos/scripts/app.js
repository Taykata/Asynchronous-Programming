const list = document.getElementById('repos');

async function loadRepos() {
	const username = document.getElementById('username').value;
	const url = `https://api.github.com/users/${username}/repos`;

	try {
		const responce = await fetch(url);
		if (!responce.ok) {
			const message = await responce.json();
			throw message;
		}

		const data = await responce.json();
		list.replaceChildren(...data.map(creaeListItem));
	} catch (error) {
		list.textContent = error.message;
	}
}

function creaeListItem({ html_url, full_name }) {
	const item = document.createElement('li');
	const anchor = document.createElement('a');
	anchor.href = html_url;
	anchor.textContent = full_name;
	item.appendChild(anchor);

	return item;
}