# File Parser for Runbeck Code Exercise

```
$ node resparser.js -h
Usage: resparser [options] [path]

Options:
  -v, --version                output the version number
  -d, --delimiter <delimiter>  specify a delimiter (default: ",")
  -n, --fields <fields>        specify how many fields each record should contain (default: 3)
  -h, --help                   display help for command


```

## Or interactively...

```
$ node resparser.js

Where is the file located?
test_file.csv

PATH: test_file.csv
DELIMITER:','
FIELDS: 3


```

##  Details

The application should ask the user 3 questions:

- Where is the file located?

- Is the file format CSV (comma-separated values) or TSV (tab-separated values)?

  ___Note:__ this implementation prompts for delimiter, rather than restricting the format to two options only._

- How many fields should each record contain?

The application should then produce two output files. One file will contain the records (if any) with the correct number of fields. The second will contain the records (if any) with the incorrect number of fields. Neither file should contain the header row. If there are no records for a given output file, do not create the file.
