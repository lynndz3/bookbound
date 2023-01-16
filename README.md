<h1 align="center">BookBound</h1>

### Link to the site: https://bookbound.herokuapp.com/

<br>

## The Why

I read too fast. (It's not a good thing. People should savor their books.)

And because I read too fast, I always need a new book. Every couple of weeks I'm emailing, texting, calling my friends and family:

> "Hey what are you reading now? Do you like it?"

> "Any good sci-fi you've read this year?"

> "What's your favorite memoir?

> Do you have a hard copy I could borrow?"

I have all the same access to Amazon and Goodreads reviews just like everyone else, but I trust my family & friends' recommendations more than the masses. 

And it's wonderful to finish a book and have people you can discuss it with!

That's where BookBound comes in. BookBound is a web application dedicated to sharing your favorite books with those you love and finding your next book from those you trust.

<br>

## Technologies
<ul>
  <li>Node</li>
  <li>NPM</li>
  <li>Express</li>
  <li>MongoDB / Mongoose</li>
  <li>Jade/Pug (templating language)</li>
  <li>Javascript, HTML, CSS</li>
  <li>Bootstrap</li>
  <li>Integrated with Google Auth</li>
  <li>Hosted on Heroku</li> 
</ul>

<br>

## Please contribute! Here's how.

<ol>
<li>Fork me</li>

<li>Install NPM dependencies (see package.json for all dependencies)</li>

<li>In `.public/javascripts/passport-setup.js` update the callback URL to `http://localhost:3000/create-account/google/callback`</li>

<li>Run script:</li> 

```
npm run serverstart
```
<li>View on localhost:3000</li>
</ol>

<br>

## Future features (in priority order)
<ul>
 <li>"Follow" friends (vs seeing all users on "/readers")</li>
 <li>Utilize Google API to search for books to reduce data entry & prevent duplicates (& display book covers!)</li>
  <li>Ability to filter columns</li>
</ul>

Have other cool ideas?? Let me know.


