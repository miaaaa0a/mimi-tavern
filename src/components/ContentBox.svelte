<script>
    import { onMount } from 'svelte';
    import AboutMe from './AboutMe.svelte';
    import LastFM from './LastFM.svelte';
    import Credits from './Credits.svelte';
    
    const tabsSpec = [
        { id: 0, label: 'About me', component: AboutMe },
        { id: 1, label: 'last.fm', component: LastFM },
        { id: 2, label: 'Credits', component: Credits }
    ]
    let Content = $state();
    Content = tabsSpec[0].component;

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

            Content = tab.component;

            if (tab.id != 1) {
                handleComponentLoaded();
            }
        } catch(err) {
            console.error('Error loading content:', err);
            handleComponentLoaded();
        }
    }

    function changeTabs(event) {
        const tab = tabsSpec.find(t => t.id === event.target.activeTabIndex);
        //Content = tab.component;
        loadContent(tab);
        activeTab = tab.id;
    }

    onMount(() => {
        //loadContent(tabsSpec[activeTab]);
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
        <Content />
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