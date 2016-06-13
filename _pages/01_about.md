---
layout: page
title: About
permalink: /about/
---
<div id="hacker-list">
  <input class="search" />
  <span class="sort" data-sort="name">Sort by name</span>
  <span class="sort" data-sort="city">Sort by city</span>
  <ul class="list">
  {% for item in site.data.medal %}
    <li>
       <h3 class="name">{{ item.Medals }}</h3>
       <p class="city">{{ item.Strength }}</p>
    </li>
  {% endfor %}
  </ul>
</div>

<script src="//cdnjs.cloudflare.com/ajax/libs/list.js/1.2.0/list.min.js"></script>
<script>
var options = {
    valueNames: [ 'name', 'city' ]
};

var hackerList = new List('hacker-list', options);
</script>