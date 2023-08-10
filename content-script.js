/**
 *  Ugly timetable title fixer
 *
 *  Text to be fixed lays in :
 *    div (id:schedule)
 *      div (className:block)
 *         span (className:info)
 *           span (which has title)
 *
 *  Human readable text is in the span elements title attribute. Parse text from title and replace innerHTML with that.
 *
 */


/**
 * find block divs from time table
 *
 * @param schedule Element containing divs with id 'block'
 */
findDivsWithIdBlock = (schedule) => {
    for (const child of schedule.children) {
        console.log(child.tagName)
        if (child.tagName === 'DIV' && child.className === 'block') {
            findSpansWithClassNameInfo(child)
        }
    }
}

/**
 * find info spans from blocks
 *
 * @param block Element containing spans with className 'info'
 */
findSpansWithClassNameInfo = (block) => {
    for (const child of block.children) {
        if (child.tagName === 'SPAN' && child.className === 'info') {
            findSpansWithTitleAttribute(child)
        }
    }
}

/**
 * fix stupid text on info spans
 *
 * @param info Element containing the final spans with title and innerHTML to be corrected
 */
findSpansWithTitleAttribute = (info) => {
    for (const child of info.children) {
        const title = child.getAttributeNode("title")
        if (child.tagName === 'SPAN' && title) {
            child.innerHTML = replaceStupidText(title.value)
        }
        else if (child.tagName === 'A') {
            child.innerHTML = ''
        }
    }
}

/**
 * fix stupid texts
 *
 * Example values in title attributes:
 * "vKU Kuvataiteen syventävät opinnot lkaste: 6"
 * "vSAA2 Saksa, A2 lkaste: 6"
 *
 * We are interested to see in innerHTML:
 * "Kuvataiteen syventävät opinnot"
 * "Saksa, A2"
 *
 * So split with ' ' and take parts 1 to length -2
 *
 * @param originalTitle Original title value where from the correct title is parsed
 * @returns {string} Parsed human readable value
 */

replaceStupidText = (originalTitle) => {
    const parts = originalTitle.split(' ')
    let fixedTitle = ''
    for(let x=1 ; x<parts.length-2 ; x++) {
        fixedTitle += parts[x] + ' '
    }
    return fixedTitle.trim()
}


// Find element containing the timetable and if it is found wait a little for it to complete and then fix it
const schedule = document.getElementById('schedule')
if(schedule) {
    setTimeout(() => {findDivsWithIdBlock(schedule)}, 100)
}
