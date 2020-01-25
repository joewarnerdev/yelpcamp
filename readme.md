RESTFUL ROUTES

NAME            URL                 VERB                DESCRIPTION
==========================================================================================================
INDEX           /dogs               GET                 Displays a list of all dogs
NEW             /dogs/new           GET                 Displays a form to make a new dog
CREATE          /dogs               POST                Add new dog to DB
SHOW            /dogs/:id           GET                 Shows info about one dog

INDEX           /campgrounds        GET                 Displays a list of all campgrounds
NEW             /campgrounds        GET                 Displays a form to make a new campground
CREATE          /campgrounds        POST                Add a new campground to DB
SHOW            /campgrounds/:id    GET                 Shows info about one campground

NEW             /campgrounds/:id/comments/new
CREATE          /campgrounds/:id/comments