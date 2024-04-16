# EmployeeCreator

{add test badges here, all projects you build from here on out will have tests, therefore you should have github workflow badges at the top of your repositories: Github Workflow Badges}
Demo & Snippets

    Include hosted link
    Include images of app if CLI or Client App

Requirements / Purpose

    This is a two-part project for post-course study. Using the [Open Trivia Database](https://opentdb.com/), the goal is to create a front-end that allows players to interact with a series of questions pulled from this database. The second part of the project is to create a backend and database which will keep track of game details, so that a user can see their record over time and re-attempt failed questions.

    Part 1 MVP
    Create an interface that will allow a user to choose level of difficulty and start a new game
    When game starts, the user should see a question card with 4 possible answers
    If they answer the question correct, a new question should appear on the screen
    If their answer is incorrect, the game is over
    Display the score (number of question answered correctly) at the end of each game
    Add a "Play Again" button under the score


    Part 2 MVP
    When the user completes a quiz it gets submitted to the API that keeps track of all game details:
        score
        date played
        questions answered
        submitted answer for each question
        correct answer for each question
        if a question was failed or not
    One of the API endpoints should allow filtering questions by failed
    On the frontend, the user should be able to view questions that they answered wrong
    They should be able to attempt those questions again
    If they answer the question correct, it should get archived in the database


    purpose of project

    This project will be built with a MySQL database, Spring Boot and Java for the backend, and with a React TypeScript frontend. Redux will also be used for front end state management.

Build Steps

    how to build / run project
    use proper code snippets if there are any commands to run

Design Goals / Approach

    Design goals
    why did you implement this the way you did?

Features

    What features does the project have?
    list them...

Known issues

    Remaining bugs, things that have been left unfixed
    Features that are buggy / flimsy

Future Goals

    What are the immediate features you'd add given more time

Change logs

    15/3/2024:
        Initial back-end creation. Based on the MVP, I've designed the schema to include 4 tables - User, gameHistory, questionBlocks and killerQuestions. This is a more complicated schema than I've build before, so will see how we go.

    16/3/2024:
        Fully implemented the schema on the back-end. There's a persistent issue in the 'Questions' entity, where it wont list the 'killerQuestion' id. It occurs to me now that because these entries are for single questions, this is probably the wrong approach. Not every question will be a run-ending killer question, and so these values will mostly be null. Every game history will have on though, so maybe I can change the link to be between these two tables instead.

        As there are different numbers of answers to different questions, made the decision to delineate answers with ' --- ' and save them as a string so that they can be stripped out and manipulated. Based on how the trivia API itself works, I think at this point I'll abandon the idea of getting multiple categories into a single game. It can be added back in at a future date if needed.

        Started the front end and hooked up the redux store, actions, actionTypes and reducers. Have only added SET_PLAYER, CHANGE_SCORE and UPDATE_QUESTIONS for now. This is actually a lot less context than I thought I would have to manage, though I am sure more will crop up as I build out the project.

        Connected the application with the back-end, can pull all user data successfully. This code will have to change when the project is hosted. I am also questioning how data should be batched and updated - I don't want to make too many unnecassary calls. (Is this where GraphQL would be useful?)

What did you struggle with?

    What? Why? How?

Licensing Details

    What type of license are you releasing this under?

Further details, related projects, reimplementations

    Is this project a reimplementation for something you've done in the past? if so explain it and link it here.
    If it's an API, is there a client app that works with this project? link it
