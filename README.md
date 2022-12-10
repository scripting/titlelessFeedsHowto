# titlelessFeedsHowto

A simple feed item viewer that works with titled or titleless items. 

### Screen shot

<img src="http://scripting.com/images/2022/12/10/titleLessExample.png" style="border: 1px dotted silver">

### Feeds are for writers and readers

We take the work of writers, and present it to readers. 

The limits of the software need to bend, whenever possible to the needs of writers and readers. 

We are not here to educate writers and readers on how we think they should write and read. 

We must be flexible and make tools that work well for them, and work better over time as they and we learn more. 

We must all work together to make the writing and reading experience on the web get better all the time. 

### Fact: Some items have titles, and some don't

It's up to the writer to decide if an item has a title.

If it doesn't have a title, it would be incorrect for a feed reader to invent a title for the item. If the writer didn't put one there, you don't get to put one there for them. They made their intention clear. You must respect it. 

This is a writer's medium, not the programmer's.

### The software is wrong

I want to give you code to crib to make your software handle titleless items well. 

In all likelihood your software does not do that currently. That's okay -- we can easily fix this.

### Basic technique

Assume you have two slots you must fill in your software, for each item: <i>title</i> and <i>body.</i>

If an item has a title, display the title in the title slot, and the first N characters of the description element in the body slot. 

If an item does not have a title, take the first X characters from the description, adjusted for whitespace (i.e. don't break where there isn't a word break), display that text in the title slot, and display the next N characters from the description in the body slot. 

### Three examples

Here's how this app deals with three test feeds. 

<a href="http://scripting.com/code/titleless/?url=https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FWorld.xml#">1. NYT feed</a>. It's an easy case because the NYT feeds are uniform. 

<a href="http://scripting.com/code/titleless/?url=http%3A%2F%2Fscripting.com%2Frss.xml">2. Scripting News feed</a> contains both titled and title-less posts.

<a href="http://scripting.com/code/titleless/?url=https%3A%2F%2Fmastodon.social%2F%40davew.rss">3. My Mastodon feed</a>, where all items are title-less. 

### Testing and development

You can test the method with any feed you like. Try entering different feed addresses in the app. If you spot a problem, share the URL of the feed as an issue in the repo here. 

You also have the source, and can come up with your own design and share it with us, and let's see, maybe this basic method can be improved on. 

