<script>
    let twitter = $state(false);

    function onKeyDown(e) {
        if (e.key == "Shift") {
            twitter = true;
        }
    }

    function onKeyUp() {
        twitter = false;
    }
</script>

<div class="social">
    <md-filled-tonal-button href="https://github.com/miaaaa0a" target="_blank">
        <div class="icon-wrapper">
            <i class="nf nf-fa-github_alt socialbtn"></i>
        </div>
    </md-filled-tonal-button>
    <md-filled-tonal-button href="https://twitter.com/miaaaa0a" target="_blank">
        <div class="icon-wrapper">
            {#if twitter}
            <i class="nf nf-cod-twitter twt-icon socialbtn"></i>
            {:else}
            <svg viewBox="0 0 128 128" width="32" height="27" class="x-icon">
                <path d="M75.916 54.2 122.542 0h-11.05L71.008 47.06 38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303 89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086-39.42-56.386h16.972L65.19 53.824l4.954 7.086 41.353 59.15h-16.97L60.782 71.793Z" style="stroke-width:.104373"></path>
            </svg>
            {/if} 
        </div>
    </md-filled-tonal-button>
    <md-filled-tonal-button href="https://soundcloud.com/miaaaa0a" target="_blank">
        <div class="icon-wrapper">
            <i class="nf nf-fa-soundcloud socialbtn"></i>
        </div>
    </md-filled-tonal-button>
    <md-filled-tonal-button href="https://www.youtube.com/@miaaaa0a" target="_blank">
        <div class="icon-wrapper">
            <i class="nf nf-fa-youtube socialbtn"></i>
        </div>
    </md-filled-tonal-button>
</div>
<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />