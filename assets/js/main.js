(function () {
	const root = document.documentElement;
	const STORAGE_KEY = "theme-preference";

	function getPreferredTheme() {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === "light" || stored === "dark") {
			return stored;
		}
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}

	function applyTheme(theme) {
		root.setAttribute("data-theme", theme);
		const btn = document.getElementById("theme-toggle");
		if (btn) {
			btn.textContent = theme === "dark" ? "light" : "dark";
		}
	}

	applyTheme(getPreferredTheme());

	document.addEventListener("DOMContentLoaded", function () {

		const newsListEl = document.getElementById("news-list-auto");
		if (newsListEl) {
			const limit = parseInt(newsListEl.getAttribute("data-limit"), 10) || null;
						const items = [
				{
					"date": "Jul 2026",
					"badge": "UPCOMING",
					"text": "Oral presentation at <a href=\"https://wccm-eccomas2026.org\" target=\"_blank\" rel=\"noopener\">WCCM-ECCOMAS 2026</a> (Munich, Germany)",
					"sub": "In Session MS344 - Agentic AI and Physics-Informed Machine Learning for Next-Generation Design and Manufacturing",
					"link": null
				},
				{
					"date": "May 2026",
					"badge": "NEW",
					"text": "Paper on Reassessing Negative 24 h pH Impedance Tests accepted in <em>npj Digital Medicine</em>",
					"sub": "First author paper on multi-feature anomaly detection for hidden GERD diagnosis.",
					"link": null
				},
				{
					"date": "Apr 2026",
					"badge": "NEW",
					"text": "Paper on Inverse Design of Thermally Active Composite accepted in <em>Materials Horizons</em>",
					"sub": "Co-first author paper on policy-transferred reinforcement learning.",
					"link": null
				},
				{
					"date": "Mar 2026",
					"badge": "NEW",
					"text": "Paper on Federated Learning for Privacy-Preserving Quality Prediction accepted in <em>International Journal of Precision Engineering and Manufacturing</em>",
					"sub": "Co-first author paper on federated learning in injection molding industry.",
					"link": null
				},
				{
					"date": "Aug 2025",
					"badge": null,
					"text": "Our paper on Physics-Informed Neural Operators for Thermoelectric Properties was published in <em>npj Computational Materials</em>.",
					"sub": "Inference of temperature-dependent properties using generalizable and label-free neural operators.",
					"link": null
				},
				{
					"date": "Mar 2023",
					"badge": null,
					"text": "Joined the lab at KAIST directed by Prof. Seunghwa Ryu as a Ph.D. student",
					"sub": "Focusing on AI-CAE, PIML, and data-driven design optimization",
					"link": null
				},
				{
					"date": "Feb 2023",
					"badge": null,
					"text": "Successfully defended M.S. thesis (official graduation on Feb 2023)",
					"sub": "Title: <em>A Study on Fault Diagnosis/Prognosis of Seal of Ship Oil Purifier Using Condition Monitoring</em>",
					"link": null
				},
				{
					"date": "Jul 2022",
					"badge": "AWARD",
					"text": "Received Excellent Poster Presentation Awards at KSIC & PHM Korea Conferences",
					"sub": "Recognized for research on fault diagnosis and condition monitoring for ship auxiliary equipment",
					"link": null
				},
				{
					"date": "Mar 2021",
					"badge": null,
					"text": "Started Master's program at Pusan National University and joined KIMM as a Researcher",
					"sub": "Advisors: Prof. Songkil Kim & Dr. Taehyun Lee",
					"link": null
				},
				{
					"date": "Feb 2021",
					"badge": null,
					"text": "Graduated with B.S. in Mechanical Engineering from Pusan National University",
					"sub": null,
					"link": null
				}
			];
			const toRender = limit ? items.slice(0, limit) : items;
			newsListEl.innerHTML = toRender.map(function (item) {
				const badgeHtml = item.badge
					? '<span class="badge badge-status">' + item.badge + '</span>'
					: '';
				const subHtml = item.sub
					? '<span class="news-sub">' + item.sub + '</span>'
					: '';
				const textHtml = item.link
					? '<a href="' + item.link + '" target="_blank" rel="noopener">' + item.text + '</a>'
					: item.text;
				return '<li class="news-item">'
					+ '<span class="news-date">' + item.date + '</span>'
					+ '<span>' + textHtml + ' ' + badgeHtml + subHtml + '</span>'
					+ '</li>';
			}).join('');
		}

		// Theme toggle logic
		const btn = document.getElementById("theme-toggle");
		if (btn) {
			btn.textContent = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
			btn.addEventListener("click", function () {
				const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
				localStorage.setItem(STORAGE_KEY, next);
				applyTheme(next);
			});
		}

		// Footer year
		const yearEl = document.getElementById("copyright-year");
		if (yearEl) {
			yearEl.textContent = new Date().getFullYear();
		}
	});

	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
		if (!localStorage.getItem(STORAGE_KEY)) {
			applyTheme(e.matches ? "dark" : "light");
		}
	});
})();

(function () {
	const overlay = document.getElementById("lightbox");
	if (!overlay) return;

	const overlayImg = document.getElementById("lightbox-img");

	document.querySelectorAll(".pub-thumb img, .thread-figure img, .project-thumb img, .grant-thumb img").forEach(function (img) {
		img.addEventListener("click", function () {
			overlayImg.src = img.src;
			overlayImg.alt = img.alt;
			overlay.classList.add("is-open");
		});
	});

	overlay.addEventListener("click", function () {
		overlay.classList.remove("is-open");
		overlayImg.src = "";
	});

	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape") {
			overlay.classList.remove("is-open");
			overlayImg.src = "";
		}
	});
})();

(function () {
	const toggles = document.querySelectorAll(".thread-toggle");
	if (toggles.length === 0) return;

	toggles.forEach(function (toggle) {
		toggle.addEventListener("click", function () {
			const thread = toggle.closest(".thread");
			thread.classList.toggle("is-open");
		});
	});
})();