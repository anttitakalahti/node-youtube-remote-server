#!/usr/bin/osascript

set mySuccess to false
set myPaused to ""
tell application "Google Chrome" to tell active tab of window 1
    set myPaused to execute JavaScript "h = document.querySelector('[aria-label=\"Pause\"]');"
    execute javascript "if(h == null) h = document.querySelector('[aria-label=\"Play\"]');"
    set mySuccess to execute javascript "if (h) { h.click(); success = true; } else { success = false; }"
end tell
set myPaused to myPaused is not equal to missing value
return {mySuccess, myPaused}
