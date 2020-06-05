<template>
  <div id="neo4jd3" style="height: 100%;"></div>
</template>
<script>
import neo4jData from "./neo4jData.json";
const Neo4jd3 = require("./neo4jd3.js");
export default {
  name: "Wel",
  data() {
    return {};
  },
  mounted() {
    var neo4jd3 = new Neo4jd3("#neo4jd3", {
      highlight: [
        {
          class: "Project",
          property: "name",
          value: "neo4jd3"
        },
        {
          class: "User",
          property: "userId",
          value: "eisman"
        }
      ],
      icons: {
        Api: "gear",
        BirthDate: "birthday-cake",
        Cookie: "paw",
        Email: "at",
        Git: "git",
        Github: "github",
        Ip: "map-marker",
        Issues: "exclamation-circle",
        Language: "language",
        Options: "sliders",
        Password: "asterisk",
        Phone: "phone",
        Project: "folder-open",
        SecurityChallengeAnswer: "commenting",
        User: "user",
        zoomFit: "arrows-alt",
        zoomIn: "search-plus",
        zoomOut: "search-minus"
      },
      images: {
        Address: "img/twemoji/1f4bb.svg",
        BirthDate: "img/twemoji/1f4bb.svg",
        Cookie: "img/twemoji/1f4bb.svg",
        CreditCard: "img/twemoji/1f4bb.svg",
        Device: "img/twemoji/1f4bb.svg",
        Email: "img/twemoji/1f4bb.svg",
        Git: "img/twemoji/1f4bb.svg",
        Github: "img/twemoji/1f4bb.svg",
        icons: "img/twemoji/1f4bb.svg",
        Ip: "img/twemoji/1f4bb.svg",
        Issues: "img/twemoji/1f4bb.svg",
        Language: "img/twemoji/1f4bb.svg",
        Options: "img/twemoji/1f4bb.svg",
        Password: "img/twemoji/1f4bb.svg",
        "Project|name|d3": "img/twemoji/1f4bb.svg",
        "Project|name|neo4j": "img/twemoji/1f4bb.svg",
        "Project|name|neo4jd3": "img/twemoji/1f4bb.svg",
        User: "img/twemoji/1f4bb.svg"
      },
      minCollision: 60,
      neo4jData: neo4jData,
      nodeRadius: 25,
      onNodeDoubleClick: function(node) {
        switch (node.id) {
          case "25":
            // Google
            window.open(node.properties.url, "_blank");
            break;
          default:
            var maxNodes = 5,
              data = neo4jd3.randomD3Data(node, maxNodes);
            neo4jd3.updateWithD3Data(data);
            break;
        }
      },
      zoomFit: true
    });
  }
};
</script>
<style lang="scss">
.node .text,
.node .icon {
  font-family: "lr-icon" !important;
}
</style>
