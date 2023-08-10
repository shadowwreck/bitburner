# bitburner

This script takes into account that you have made some money, and have all the tools to open ports already.

There is a couple of things to be modified by the end user in the scripts. 
I have made this as easy as I possibly can, and to understand for new comers. 

Secondly.   I will assume you know enough about javascript that you can sift through the files to adjust parameters accordingly.



## What this does.




hostnames.txt will allow you to add and remove hosts/servernames manually. All functions read this file explicitly.


### What does **auto-hack.js** do you ask. Well

It will firstly, (after adding any additional server to the blacklist which it will skip over. 
It will check the targets current money
Hack them
Recheck their money and see if their was a gain, or nothing.
If nothing, we will grow
It it failed, we will weaken


### What does **copy.js** do?
It will first, the scripts do not exist, which we can define by    **if (existingFilesCount === 5) {**   5 = The amount of files you are copying. This will ENSURE all files are copied

Then it will check to see, if the start.js running, and does the files exist on the target.   
It will calculate the max threads the target can use for the script, and exec start.js with those max threads(Which so far, is their literal max)

If the scripts do not exist, or is not running, it will copy them, and exec the,


### What and how does *start.js* work?

This is where it get interesting. 
We have created a file for hostnames, which is read from by every script(Which is modifiable)
If we dont have root on the target, we will run rootscript to open ports, and gain root. 
It will then see if the target has enough ram to run the script, if it does, it will call on copy.js

The next part is, if we have hacked the target recently, go to the next host, if we have not hacked the target recently, hack them. 

Upon failing a hack, we will weaken, if we had success, or gained money, we will grow(This helps us stay profitable)







