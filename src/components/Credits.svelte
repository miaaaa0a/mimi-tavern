<script>
	const libraries = [
		{
			name: 'Astro',
			desc: 'cool web framework. first time working with one, i likey',
			icon: 'nf-custom-astro'
		},
		{
			name: 'Vercel',
			desc: 'thing thats running the webserver',
			icon: 'nf-md-triangle'
		},
		{
			name: 'Material 3 Web',
			desc: 'i totally did not use this as an excuse to not make my own design for this website',
			icon: 'nf-md-material_design'
		},
		{
			name: 'Svelte',
			desc: 'another web framework which actually made my code look less atrocious!!!',
			icon: 'nf-dev-svelte'
		},
		{
			name: 'Nerd Fonts',
			desc: 'provider for cool icons that you see almost everywhere here',
			icon: 'nf-seti-font'
		}
	]

	const coolpeople = [
		{
			name: 'Roux "sudocode1"',
			desc: 'ty for giving me the domain g...',
			url: 'https://github.com/sudocode1'
		},
		{
			name: 'Lea "Leandro170"',
			desc: 'stupid creature',
			url: 'https://github.com/Leandro-170'
		},
		{
			name: 'Vee "vendicated"',
			desc: 'told me about astro and also helped me with the website. also dev of vencord :3',
			url: 'https://vendicated.dev'
		},
		{
			name: 'Chloe "sapphic.moe"',
			desc: 'made the awesom simple-fm library used on the last.fm page!!!',
			url: 'https://sapphic.moe'
		}
	]
</script>

<p class="md-typescale-title-large">stuff used for this website</p>
<md-list class="info-list">
	{#each libraries as entry}
	<md-divider inset></md-divider>
    <md-list-item>
		<div slot="headline">{entry.name}</div>
		<div slot="supporting-text">{entry.desc}</div>
		<i slot="end" class="nf {entry.icon}"></i>
   	</md-list-item>
	{/each}
	<md-divider inset></md-divider>
</md-list>
<p class="md-typescale-title-large">cool people</p>
<md-list class="info-list">
	{#each coolpeople as entry}
	<md-divider inset></md-divider>
    <md-list-item type="link" href={entry.url} target="_blank">
		<div slot="headline">{entry.name}</div>
		<div slot="supporting-text">{entry.desc}</div>
   	</md-list-item>
	{/each}
	<md-divider inset></md-divider>
</md-list>