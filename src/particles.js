
const params = {
	    particles: {
	        number: {
	            value: 160,
	            density: {
	                enable: false
	            }
	        },
	        size: {
	            value: 30,
	            random: true,
	            anim: {
	                speed: 4,
	                size_min: 1
	            }
	        },
	        line_linked: {
	            enable: false
	        },
	        move: {
	            random: true,
	            speed: 1,
	            direction: "top",
	            out_mode: "out"
          },
          color: {
            value: ["#db2828", "#b5cc18","#f2711c","#fbbd08","#21ba45","#00b5ad", "#2185d0", "#6435c9", "#a333c8", "#e03997"]
          }
	    },
	    interactivity: {
	        events: {
	            onhover: {
	                enable: true,
	                mode: "bubble"
	            },
	            onclick: {
	                enable: true,
	                mode: "repulse"
	            }
	        },
	        modes: {
	            bubble: {
	                distance: 250,
	                duration: 2,
	                size: 10,
	                opacity: 0
	            },
	            repulse: {
	                distance: 400,
	                duration: 4
	            }
          }
        }
}

export default params;
