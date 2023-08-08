# bitburner

This script takes into account that you have made some money, and have all the tools to open ports already.

There is a couple of things to be modified by the end user. 
Firstly.   The hostnames.txt file is a file you can add and remove hosts manually. This file is read from all functions. 

Secondly.   I will assume you know enough about javascript that you can sift through the files to adjust parameters accordingly.



What this does.
We run start.js which will run some functions, and will call on the appropriate scripts depending on the condition that is met or unmet. 

It will iterate through the list of hostnames.txt in order to find any that does not have root. 
If that target does not have root, and we are able to hack it.  It will auto open the ports, and nuke it. 

Once we have root, it will move on to hacking the targets that have root access. 
Upon doing so, It will copy the scripts to those targets and run the files if the host ram allows it. 


The script will also auto grow, to ensure we stay profitable. 







