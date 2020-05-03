---
title: /files
layout: page
---
{% assign category_arrays = site.posts | map: 'categories' %}
{% capture categories %}
    {%- for array in category_arrays -%}
        /{{array | join: '/'}}
        {%- unless forloop.last -%}<br/>{%- endunless -%}
    {%- endfor -%}
{% endcapture %}
{% assign sorted_categories = categories | split: '<br/>' | sort_natural | uniq %}

<div class="toc">
    <h2>Jumps</h2>
    <div>
        <ul>
        {% for category in sorted_categories %}
            <li><a href="#{{category}}">{{category}}</a></li>
        {% endfor %}
        </ul>
    </div>
</div>
{% capture posts %}
    {%- for post in site.posts -%}
        {{post.url}}
        {%- unless forloop.last -%}<br/>{%- endunless -%}
    {%- endfor -%}
{% endcapture %}
{% assign sorted_posts = posts | split: '<br/>' | sort_natural %}

<h3>Files</h3>
{% assign category_index = 0 %}
{% assign current_category = sorted_categories[category_index] %}
<div class="links">
    <ul>
    {% for post in sorted_posts %}
        {% assign parts = post | split: current_category | size %}
        {% if parts > 1 %}
            <li id="{{current_category}}"><a href="{{post}}">{{post}}</a></li>
            {% assign category_index = category_index | plus: 1 %}
            {% assign current_category = sorted_categories[category_index] %}
        {% else %}
            <li><a href="{{post}}">{{post}}</a></li>
        {% endif %}
    {% endfor %}
    </ul>
</div>