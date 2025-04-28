<script>
    import { onMount } from 'svelte';
    
    const tabsSpec = [
        { id: 0, label: 'About me', url: '/partials/aboutme' },
        { id: 1, label: 'last.fm', url: '/partials/lastfm' },
        { id: 2, label: 'Credits', url: '/partials/credits' }
    ]
    let content = $state('');
    let visible = $state(true);
    let contentLoaded = $state(false);
    let activeTab = 0;

    function handleComponentLoaded() {
        contentLoaded = true;
        visible = true;
    }

    async function loadContent(tab) {
        try {
            visible = false;
            contentLoaded = false;

            await new Promise(resolve => setTimeout(resolve, 200));

            const response = await fetch(tab.url);
            if (!response.ok) {
                throw new Error(`Failed to load: ${response.status}`);
            }

            content = await response.text();

            if (!content.includes('data-waits-for-load="true"')) {
                handleComponentLoaded();
            }
        } catch(err) {
            console.error('Error loading content:', err);
            handleComponentLoaded();
        }
    }

    function changeTabs(event) {
        const tab = tabsSpec.find(t => t.id === event.target.activeTabIndex);
        loadContent(tab);
        activeTab = tab.id;
    }

    onMount(() => {
        loadContent(tabsSpec[activeTab]);
        document.addEventListener('componentLoaded', handleComponentLoaded);
        return () => {
            document.removeEventListener('componentLoaded', handleComponentLoaded);
        };
    });

</script>

<div class="content-box">
    <md-tabs class="tabs" onchange={changeTabs}>
        {#each tabsSpec as tab}
            <md-primary-tab>{tab.label}</md-primary-tab>
        {/each}
    </md-tabs>
    <div id="content" class={visible ? 'visible' : 'hidden'} >
        {@html content}
    </div>
</div>

<style>
    .visible {
        opacity: 1;
        transition: opacity 200ms;
    }
    .hidden {
        opacity: 0;
        transition: opacity 200ms;
    }
</style>