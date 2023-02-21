# Shy

A "programming language" I made, it ressembles assembly, but it's not effecient as it's written in javascript, and not in a lower level language.

## Syntax

- **OUT**: Outputs to the console
- **EQU**: Checks if the 2 arguments that follow are equal (can be variables or hardcoded)
- **VAR**: Creates a variable with the using the 2 following arguments as the name and value
- **CDN**: checks a condition (basically an if statement) argument that follows CDN must be a keyword
- **NXT**: defines what should be executed if above CDN returns true
- **ELSE**: defines what should be executed if above CDN returns false
- **EXS**: check if variable name that follows is defined
- **RDM**: returns a random value between 0 and the first argument
- **EVL**: evaluates the math expression that follows
- **LST**: creates a list, uses the first argument as the name and the others as value added to the list

## A few precisions

The NXT and ELSE statements do not have to follow the CDN statement. ie:

```
VAR A 5
CDN EQU A 6
OUT is a equal to 6?
NXT OUT it is
ELSE OUT it isn't
```
There is no specific syntax for comments anything not recognised as a keyword will be skipped. If the first word of your comment is a keyword add a character infront, such as a space or a #.

Files are saved in local storage and the first line is used as the title

## Future Updates

I'll doubt i'll keep adding to this language as it was just a test project to see if i could do it, but i would love to try and make an actuall programming language in something like C or C++
