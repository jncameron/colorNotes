
const paramsMobile = {
  particles: {
      number: {
          value: 20,
          density: {
              enable: false
          }
      },
      size: {
          value: 50,
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
  }
}

export default paramsMobile;
