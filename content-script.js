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
        if (hasClass(child,'teachers') || hasClass(child,'rooms')) {
            child.innerHTML = ''
        } else {
            child.innerHTML = replaceStupidText(title.value)
        }
    }
}

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

/**
 * fix stupid texts
 *
 * Example values in title attributes:
 * "vKU Kuvataiteen syventävät opinnot lkaste: 6"
 * "vSAA2 Saksa, A2 lkaste: 6"
 *
 * We are interested to see in innerHTML:
 * <div tabindex="0" class="block" data-weekday="Tiistai" data-block="14033" data-school="622449788" data-sijid="14033" style="width: 19.6%; height: 44px; left: 20.2%; top: 135px; background-color: rgb(166, 202, 240);" data-original-title="" title="">
 *     <span aria-hidden="true" class="info" style="font-size: 14px; top: 6px;">
 *  -->    <a target="_blank" rel="noopener" href="/!0416184/groups/72704" title="AI Suomen kieli ja kirjallisuus lkaste: 4" class="no-underline-link" style="font-size: 14px;"> AI</a>
 *         <a target="_blank" rel="noopener" href="/!0416184/profiles/teachers/657" class="normal teachers profile-link no-underline-link" title="Huopainen Anne" style="font-size: 14px;"> AHu</a>
 *         <a target="_blank" rel="noopener" href="/!0416184/profiles/rooms/372" class="normal rooms profile-link no-underline-link" title="222/4B" style="font-size: 14px;"> 222</a>
 *     </span>
 *     <span class="class" style="font-size: 14px; top: 6px;"></span>
 *     <h3 class="sr-only">Tiistai: Alkamisaika10:15Päättymisaika11:00: AI: : </h3>
 * </div>
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
