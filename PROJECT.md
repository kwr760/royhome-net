
# Overview (WIP)

The main aspect of this project to provide a point to display my skills in the form of hosting my resume.

# Features

Mainly this is react frontend with a nodejs backend.  Currently the backend is sharing both the web hosting and 
api server which is connected hosting a postgres database.

I wanted to build a website so that I could piece together each individual technology instead of stumbling with 
small pieces on knowledge with small chunks of technology usually given in an agile process.

Obviously this can be a lot more simple and in many ways it should.  For example I am storing my resume in a postgres
database.

## Server Side Rendering

My website is SSR, this means that site is rendered first on the server and then transmitted to the browser.  This is
done so that google and presumable other sites can collect good SEO information.  It is both simple and complex.  The 
complexity it getting it work the first time and then having it work in a way that requires little or simple 
modification as content is added.  

An additional complexity that my site added was that I wanted content slightly driven by logged in authentication.  

## Authentication

I authentication primary so that I could host my site with CD, so that only my login would have the changes I was
working to be available to the rest of the web.  This was easy enough using auth0, and on the third person checking 
my site, she found that she couldn't authenicate with Facebook.

The fun that I am having.  Anyways that ocurred as
Facebook requires each site to have Privacy Policy.  And I think even when I update my privacy policy Facebook might 
not decide to review it.  Even ways authenication is no longer an option, but the reality is every site should have 
a policy.  

Long story short, I save no information other than my manually added resume.  And my only vague plan is to keep 
track of my simple games scores (Yet to Come), one of goals will be to keep indirectly connected score tracking.

## Application Server

Even though my site does not need and would be easier to focus solely on the frondend, I want a backend so that my
future projects can utilize it.  Currently the backend is directly connected to a postgres database.  As the backend 
is really simple there is not much need to separate between the API server and the database server, but I might 
do this anyways.  So that at least conceptual the deployment of the pieces can be done separately.

## Database

As I mentioned a couple of time, the database that I am using is postgres database.  For me the cause was a toss between
MySQL and Postgres as I wanted a relational databsae to better to describe that data I am storing.   I choice Postgres 
and it seems to be more expressive.  But I am thinking about using the knex package, which might make the distinction
between the two less relavent.  

Immediately after adding the postgres database, I felt the regard of not add a NoSql database.  Not for any reason
other than becoming more familiar with that technically.

## Secure

The site is HTTPS and I am practicing good security, but a lot of these for my simple site is out of the box.  One 
of the steps I have planned for next steps is a hardening of the site, including security,

My site is hosted on a secure server and does not contain any keys in github.

## Hosted / Continuous Development

My initial reaction or intention was to host my site locally on an old machine of mine.  But I decided to use linode.
No real reason other than predictable cost.  And I wanted to experience that process of setting up a pipeline to 
deliver my software using continuous practices.  I do my development on my local linux box.  I setup my branch,
github and travis to monitor the pushing to branches and trigger the push/merge to master to deliver my code to 
linode.  

I can deliver code, verifying linting, unit tests (100% coverage) and push (on success) to my production box.  So that
I can deliver in less than 15 minutes.

## Linting / Typed / Tested

To make my life easier and to understand the tools better.  I setup the code to lint my code continuously.

I wanted a typed language/system and decided to go with flow-typed.  Ever since that I wanted to do one of two things, 
go to typescript or just get rid of it.  That is not to say that I do not like flow, it just that it seems to add a 
difficult layer of complexity around the edges.  Meaning as I add packages, flow needs to rangled.  Most likely I'll
have the same problem with type script.  But since one of goals or aims is to use more relevant technologies, I 
believe type script is the direction I should have gone in.  As for me griping about gettig rid of a typed system.  
I think enjoy the simplicity of code described in the various forums I view.  But think that javascript should be 
typed.  Maybe I'll change my mind about that, but not at the moment.

I am striving for 100% unit test coverage.  So far so good.  Eventually I'll need to consider adding more tests.  
Adding an E2E and intergation test framework will be another set of challenges.












