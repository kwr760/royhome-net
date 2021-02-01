# Overview

The main aspect of this project to provide a point to display my skills in the form of hosting my resume.

# Features

Mainly this is a React frontend with a NodeJS backend.  Currently, the NodeJS backend is split between a web server and 
API server which is hosting a Postgres database.

I wanted to build a website so that I could piece together each individual technology instead of stumbling with 
small pieces on knowledge with small chunks of technology usually given in an agile process.

Obviously this can be done in a simpler way and in ways it should.  For example, I am storing my resume in a Postgres
database, which is not needed.  Rendering the resume from the web server is simpler and would be easier for me to 
maintain the application.

I want to set up these technologies not only to learn them, but for a second reason and that as I add new functionality 
it will be easier for me to add more complex features.

## Server Side Rendering

My website is SSR, this means that the site is rendered first on the server and then send to the browser.  This is
done so that google and presumable other sites can collect good SEO information.  It is both simple and complex.  The 
complexity of it getting it work the first time and then having it work in a way that requires little or simple 
modification as content is added.  

One of the additional complexity is my site is dependent authentication and dependent on that will affect what will
be rendered.  Considering how little my website does with authentication, it was a lot of work without a lot of 
immediate gain.  But I know if I took the time to learn, then as other features need server dependent content it would
be easier for me.

## Authentication

I added authentication primary so that I could host my site through continuous delivery.  Giving my login access to the 
new content while keeping the stable content available to the rest of the web.

My initial intention was to give access to limited people who authenticated themselves and which I knew might be 
interested in specific content.  For example, my friends or colleagues, would have different content available to 
them.  But I decided that most content will be accessible to everyone.

## Application Server

Even though my site does not need and would be easier to focus solely on the frontend, I wanted a backend so that my
future projects can utilize it.  Currently, the backend is directly connected to a Postgres database.  As the backend 
is really simple there is not much need to separate between the API server and the database server, but I might 
do this anyways.  So that at least conceptual the deployment of the pieces can be done separately.  I also want to 
move my NodeJS API server to a kotlin server.

## Database

As I mentioned a couple of times, the database that I am using is a Postgres database.  For me the choice was a toss 
between MySQL and Postgres as I wanted a relational database to better to describe that data I am storing.   I choose 
Postgres, since it was described as more expressive.  

I want to maintain the database through code or at least through the release process.  Currently, the data is stored
in SQL files, and plan on exploring how to do this in kotlin/Java.

## Hosted / Continuous Development

My initial reaction or intention was to host my site locally on an old machine of mine.  But I decided to use Linode.
No real reason other than predictable cost.  I wanted to experience the process of setting up a pipeline to 
deliver my software using continuous practices.  I develop on my local Linux box, pushing up my branch, and 
GitHub and Travis monitor the repository and trigger the push/merge to master to deliver my code to Linode.  

As I deliver the code, I verify the change and on success deliver to my production box.  Delivering in less than 15 minutes.

## Linting / Typed / Tested

To make my life easier and to understand the tools better.  I set up the code to lint my code.

I wanted a typed language/system and decided to go with flow-typed.  Ever since that I wanted to do one of two things, 
go to typescript or just get rid of it.  That is not to say that I do not like flow, it just added a layer of 
difficultly around the edges.  Meaning as I add packages, flow needs to be wrangled.  

Since then, I switched to TypeScript and find it easier to use then flow type.  I'm happy with TypeScript and glad to 
make the switch.

I am striving for 100% unit test coverage.  So far so good.  Eventually I'll need to consider adding more tests.  
Adding an E2E or integration test framework will be another set of challenges.

## Material-UI

Initially, my site used reactstrap.  It worked well, but felt that it was a little old.  I started to look
for a replacement.  I choose Material-UI, though I'm just beginning to use it.  The experience has been good.  To 
implement my dark mode I'm using the theming and find the cleanness of it is far simpler than my previous solution.
