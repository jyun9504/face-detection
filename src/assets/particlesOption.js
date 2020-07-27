import svgUrl from './deer.svg'

const particlesOption = {
	"fps_limit": 28,
	"particles": {
		"collisions": {
			"enable": false
		},
		"number": {
			"value": 200,
			"density": {
				"enable": false
			}
		},
		"line_linked": {
			"enable": true,
			"distance": 15,
			"opacity": 0.4,
			"color": "#444444",
		},
		"move": {
			"speed": 1
		},
		"opacity": {
			"anim": {
				"enable": true,
				"opacity_min": 0.05,
				"speed": 1,
				"sync": false
			},
			"value": 0.4
		}
	},
	"polygon": {
		"enable": true,
		"scale": 0.15,
		"type": "inline",
		"move": {
			"radius": 10
		},
		"url": svgUrl,
		"inline": {
			"arrangement": "equidistant"
		},
		"draw": {
			"enable": true,
			"stroke": {
				"color": "rgba(0, 0, 0, .6)"
			}
		}
	},
	"retina_detect": false,
}

export default particlesOption;