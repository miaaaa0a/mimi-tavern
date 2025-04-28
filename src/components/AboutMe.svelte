<script>
import { DateTime, Interval } from "luxon";

const langs = [
    {
        name: 'python',
        desc: 'even though i mention quite often that python sucks, it\'s still a somewhat good language for scripting and NOTHING more',
        icon: 'nf-dev-python'
    },
    {
        name: 'javascript',
        desc: 'nice language, i like its syntax more than python even though they\'re both interpreted',
        icon: 'nf-dev-javascript_badge'
    },
    {
        name: 'c',
        desc: 'lost children will be taught the C programming language',
        icon: 'nf-custom-c'
    },
    {
        name: 'haxe',
        desc: 'fnf coding language except once i wrote a discord bot with this out of boredom',
        icon: 'nf-seti-haxe'
    },
    {
        name: 'rust',
        desc: '🚀Rust is an 🚀efficient programming language focused on 🚀memory-safe code and 🚀performance 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀',
        icon: 'nf-seti-rust'
    }
];

const artists = [
    {
        artist: '100 gecs',
        desc: 'gahhhh i love them their music is actually so good... both laura and dylan are really talented people imho'
    },
    {
        artist: 'Lida',
        desc: 'honestly one of the best mainstream russian artists'
    },
    {
        artist: 'конец солнечных дней',
        desc: 'might be one of my favourite bands of all time. their music is so GOOD best post-punk group i think'
    },
    {
        artist: 'Ворон Клюющий Глаза Детей',
        desc: 'who doesnt love an obscure band from 2008. basically just russian mindless self indulgence with more chaotic beats and edgier lyrics. still love em tho'
    },
    {
        artist: 'Car Seat Headrest',
        desc: 'подголовник автомобильного кресла'
    },
    {
        artist: 'Синдром Восьмиклассника',
        desc: 'yyaaaay more post-punky music'
    }
];

const specs = [
    {
        component: 'CPU',
        name: 'AMD Ryzen 3 3200G',
        icon: 'nf-oct-cpu'
    },
    {
        component: 'GPU',
        name: 'ASRock Radeon RX 580',
        icon: 'nf-fa-picture_o'
    },
    {
        component: 'RAM',
        name: 'x2 8 GB 2133 mHz sticks',
        icon: 'nf-fae-chip'
    },
    {
        component: 'Motherboard',
        name: 'Gigabyte GA-A320M-H',
        icon: 'nf-cod-circuit_board'
    },
    {
        component: 'Storage',
        name: 'Apacer AS350 240GB; TOSHIBA MQ04ABF100 (1 TB)',
        icon: 'nf-fa-hdd_o'
    }
]

const then = DateTime.local(2009, 1, 31, 12, 0, 0);
const now = DateTime.now();
let i = Interval.fromDateTimes(then, now);

let age = Math.trunc(i.length('years'));
</script>

<p class="md-typescale-display-small">haii!! im mia :3</p>
<p class="md-typescale-body-medium">
	i'm a {age} year old girl from belarus. i do some programming and also some music production (albeit the music i make sounds kind of trash). here's some more stuff about me listed in a prettier way:
</p>
<p class="md-typescale-title-large">coding languages</p>
<md-list class="info-list">
    {#each langs as entry}
    <md-divider inset></md-divider>
	<md-list-item>
		<div slot="headline">{entry.name}</div>
		<div slot="supporting-text">{entry.desc}</div>
		<i slot="end" class="nf {entry.icon}"></i>
   	</md-list-item>
    {/each}
    <md-divider inset></md-divider>
</md-list>
<p class="md-typescale-title-large">favourite music artists</p>
<md-list class="info-list">
    {#each artists as entry}
    <md-divider inset></md-divider>
	<md-list-item>
	    <div slot="headline">{entry.artist}</div>
		<div slot="supporting-text">{entry.desc}</div>
	</md-list-item>
    {/each}
    <md-divider inset></md-divider>
</md-list>
<p class="md-typescale-title-large">pc specs</p>
<md-list class="info-list">
    {#each specs as entry}
    <md-divider inset></md-divider>
	<md-list-item>
		<div slot="headline">{entry.component}</div>
		<div slot="supporting-text">{entry.name}</div>
		<i slot="end" class="nf {entry.icon}"></i>
	</md-list-item>
    {/each}
    <md-divider inset></md-divider>
</md-list>