document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('.collapsible.expandable');
    const instances = M.Collapsible.init(elems, {
        accordion: false,
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems, {
        twelveHour: false,
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // collapsibleの最初のアイテムを開けておく
    let elem = document.querySelector('ul.collapsible.events');
    M.Collapsible.getInstance(elem).open(0);
});

function addEvent() {
    let html = '<li>\n' +
        '                                <div class="collapsible-header valign-wrapper">\n' +
        '                                    <span class="circled" style="background-color: #F44336;"><span style="visibility: hidden;">10</span></span>\n' +
        '                                    <span class="title">Event Name</span>\n' +
        '                                    <span class="secondary-content">\n' +
        '                                        <i class="material-icons delete" onclick="deleteEvent(this); event.stopPropagation();">delete</i>\n' +
        '                                    </span>\n' +
        '                                </div>\n' +
        '                                <div class="row collapsible-body input-form">\n' +
        '                                    <div class="title col m12">\n' +
        '                                        <h5>\n' +
        '                                            <span>Event Title</span>\n' +
        '                                            <i class="material-icons left">title</i>\n' +
        '                                        </h5>        \n' +
        '                                        <div class="input-field">\n' +
        '                                            <input value="Event Name" class="event_title" placeholder="Event Title" type="text" class="validate" onkeypress="setTitle(this,event.keyCode);">\n' +
        '                                        </div>                \n' +
        '                                    </div>\n' +
        '                                    <div class="date col m12">\n' +
        '                                        <h5>\n' +
        '                                            <span>Date</span>\n' +
        '                                            <i class="material-icons left">date_range</i>\n' +
        '                                        </h5>\n' +
        '                                        <div class="calendars row">\n' +
        '                                            <div class="calendar col m12 l6" month="4">\n' +
        '                                                <div class="calendar-title row center-align">\n' +
        '                                                    <span class="date">\n' +
        '                                                        <span class="month">April</span>\n' +
        '                                                        <br>\n' +
        '                                                        <span class="year">2019</span>\n' +
        '                                                    </span>\n' +
        '                                                </div>\n' +
        '                                                <table class="calendar-body">\n' +
        '                                                    <thead>\n' +
        '                                                        <tr>\n' +
        '                                                            <th class="center-align red-text">Sun.</th>\n' +
        '                                                            <th class="center-align">Mon.</th>\n' +
        '                                                            <th class="center-align">Tue.</th>\n' +
        '                                                            <th class="center-align">Wed.</th>\n' +
        '                                                            <th class="center-align">Thu.</th>\n' +
        '                                                            <th class="center-align">Fri.</th>\n' +
        '                                                            <th class="center-align blue-text">Sat.</th>\n' +
        '                                                        </tr>\n' +
        '                                                    </thead>\n' +
        '                                                    <tbody>\n' +
        '                                                        <tr>\n' +
        '                                                            <td class="center-align red-text"></td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="digit">1</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="digit">2</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="digit">3</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="digit">4</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="digit">5</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align blue-text">\n' +
        '                                                                <span class="digit">6</span>\n' +
        '                                                            </td>\n' +
        '                                                        </tr>\n' +
        '                                                        <tr>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align red-text">\n' +
        '                                                                <span class="digit">7</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="digit">8</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="digit">9</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>10</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>11</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>12</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align blue-text">\n' +
        '                                                                <span>13</span>\n' +
        '                                                            </td>\n' +
        '                                                        </tr>\n' +
        '                                                        <tr>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align red-text">\n' +
        '                                                                <span>14</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>15</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>16</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>17</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>18</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>19</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align blue-text">\n' +
        '                                                                <span>20</span>\n' +
        '                                                            </td>\n' +
        '                                                        </tr>\n' +
        '                                                        <tr>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align red-text">\n' +
        '                                                                <span>21</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>22</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>23</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="circled" event_index="1">24</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>25</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>26</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align blue-text">\n' +
        '                                                                <span>27</span>\n' +
        '                                                            </td>\n' +
        '                                                        </tr>\n' +
        '                                                        <tr>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align red-text">\n' +
        '                                                                <span>28</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>29</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>30</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td class="center-align"></td>\n' +
        '                                                            <td class="center-align"></td>\n' +
        '                                                            <td class="center-align"></td>\n' +
        '                                                            <td class="center-align blue-text"></td>\n' +
        '                                                        </tr>\n' +
        '                                                    </tbody>\n' +
        '                                                </table>\n' +
        '                                            </div>\n' +
        '                                            <div class="calendar col m12 l6" month="5">\n' +
        '                                                <div class="calendar-title row center-align">\n' +
        '                                                    <span class="date">\n' +
        '                                                        <span class="month">May</span>\n' +
        '                                                        <br>\n' +
        '                                                        <span class="year">2019</span>\n' +
        '                                                    </span>\n' +
        '                                                </div>\n' +
        '                                                <table class="calendar-body">\n' +
        '                                                    <thead>\n' +
        '                                                        <tr>\n' +
        '                                                            <th class="center-align red-text">Sun.</th>\n' +
        '                                                            <th class="center-align">Mon.</th>\n' +
        '                                                            <th class="center-align">Tue.</th>\n' +
        '                                                            <th class="center-align">Wed.</th>\n' +
        '                                                            <th class="center-align">Thu.</th>\n' +
        '                                                            <th class="center-align">Fri.</th>\n' +
        '                                                            <th class="center-align blue-text">Sat.</th>\n' +
        '                                                        </tr>\n' +
        '                                                    </thead>\n' +
        '                                                    <tbody>\n' +
        '                                                        <tr>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align red-text"></td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align"></td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align"></td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="digit">1</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="digit">2</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="digit">3</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align blue-text">\n' +
        '                                                                <span class="digit">4</span>\n' +
        '                                                            </td>\n' +
        '                                                        </tr>\n' +
        '                                                        <tr>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align red-text">\n' +
        '                                                                <span class="digit">5</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="digit">6</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="digit">7</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="digit">8</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="digit">9</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>10</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align blue-text">\n' +
        '                                                                <span>11</span>\n' +
        '                                                            </td>\n' +
        '                                                        </tr>\n' +
        '                                                        <tr>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align red-text">\n' +
        '                                                                <span>12</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="circled" event_index="3">13</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="circled" event_index="3">14</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>15</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>16</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>17</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align blue-text">\n' +
        '                                                                <span>18</span>\n' +
        '                                                            </td>\n' +
        '                                                        </tr>\n' +
        '                                                        <tr>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align red-text">\n' +
        '                                                                <span>19</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="circled" event_index="3">20</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="circled" event_index="3">21</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>22</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>23</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>24</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align blue-text">\n' +
        '                                                                <span>25</span>\n' +
        '                                                            </td>\n' +
        '                                                        </tr>\n' +
        '                                                        <tr>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align red-text">\n' +
        '                                                                <span>26</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="circled" event_index="3">27</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span class="circled" event_index="3">28</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>29</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>30</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align">\n' +
        '                                                                <span>31</span>\n' +
        '                                                            </td>\n' +
        '                                                            <td onclick="selectDate(this)" class="center-align blue-text"></td>\n' +
        '                                                        </tr>\n' +
        '                                                    </tbody>\n' +
        '                                                </table>\n' +
        '                                            </div>\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="time col m12 row">\n' +
        '                                        <h5>\n' +
        '                                            <span>Time</span>\n' +
        '                                            <i class="material-icons left">schedule</i>\n' +
        '                                        </h5>\n' +
        '                                        <div class="col m5 start">\n' +
        '                                            <input placeholder="Start" type="text" class="timepicker">\n' +
        '                                        </div>\n' +
        '                                        <div class="col m2 center-align"> - </div>\n' +
        '                                        <div class="col m5 end">\n' +
        '                                            <input placeholder="End" type="text" class="timepicker">\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="place col m12">\n' +
        '                                        <h5>\n' +
        '                                            <span>Place</span>\n' +
        '                                            <i class="material-icons left">place</i>\n' +
        '                                        </h5>\n' +
        '                                        <input type="text">\n' +
        '                                    </div>\n' +
        '                                    <div class="style col m12">\n' +
        '                                        <h5>\n' +
        '                                            <span>Style</span>\n' +
        '                                            <i class="material-icons left">style</i>\n' +
        '                                        </h5>\n' +
        '                                        <div class="color">\n' +
        '                                            <h6>\n' +
        '                                                <span>Color</span>\n' +
        '                                                <i class="material-icons left">palette</i>\n' +
        '                                            </h6>\n' +
        '                                            <div class="color-picker row">\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 red white-text selected"><i class="material-icons">done</i>selected</div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 pink white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 purple white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 deep-purple white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 indigo white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 blue white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 light-blue white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 cyan white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 teal white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 green white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 light-green white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 yellow white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 amber white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 orange white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 deep-orange white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 brown white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 grey white-text"></div>\n' +
        '                                                <div onclick="selectColor(this);" class="valign-wrapper center-align col s4 m3 l2 blue-grey white-text"></div>\n' +
        '                                            </div>\n' +
        '                                        </div>\n' +
        '                                        <div class="shadow">\n' +
        '                                            <h6>\n' +
        '                                                <span>Shadow</span>\n' +
        '                                                <i class="material-icons left">layers</i>\n' +
        '                                            </h6>\n' +
        '                                            <div class="shadow_checkbox">\n' +
        '                                                <label>\n' +
        '                                                    <input type="checkbox"/>\n' +
        '                                                    <span onclick="shadowOnOff(this);">apply shadow effect</span>\n' +
        '                                                </label>\n' +
        '                                            </div>\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="right buttons">\n' +
        '                                        <a class="btn red delete" onclick="deleteEvent(this)">\n' +
        '                                            <span>delete</span>\n' +
        '                                            <i class="material-icons left">delete</i>\n' +
        '                                        </a>\n' +
        '                                        <a class="btn teal save" onclick="closeCollapsible(this)">\n' +
        '                                            <span>save</span>\n' +
        '                                            <i class="material-icons left">done</i>\n' +
        '                                        </a>    \n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </li>';
    let elem = document.createElement('div');
    elem.innerHTML = html;
    elem = elem.firstElementChild;

    document.querySelector('ul.collapsible.events').appendChild(elem);
}

function setTitle(elem, keycode) {
    if (13 === keycode) {
        let title = elem.value;
        while (elem.tagName !== 'LI') {
            elem = elem.parentElement;
        }
        elem.querySelector('.collapsible-header span.title').innerHTML = title;
    }
}

// elem: Dateを示すtd
function selectDate(elem) {
    let span = elem.querySelector('span');
    if (elem.classList.contains('selected')) {
        elem.classList.remove('selected');
        span.classList.remove('circled');
    } else {
        elem.classList.add('selected');
        span.classList.add('circled');
    }
}

function selectColor(elem) {
    const children = elem.parentElement.children;
    for (let index = 0; index < children.length; index++) {
        const element = children[index];
        element.innerHTML = '';
        element.classList.remove('selected');
    }
    const color = window.getComputedStyle(elem).backgroundColor;
    console.log(color);

    elem.innerHTML = '<i class="material-icons">done</i>selected';
    elem.classList.add('selected');
    while (elem.tagName !== 'LI') {
        elem = elem.parentElement;
    }
    elem.querySelector('.collapsible-header span.circled').style.backgroundColor = color;
}

function shadowOnOff(elem) {
    while (elem.tagName !== 'LI') {
        elem = elem.parentElement;
    }
    elem = elem.querySelector('.collapsible-header span.circled');
    if (elem.classList.contains('z-depth-2')) {
        elem.classList.remove('z-depth-2');
    } else {
        elem.classList.add('z-depth-2');
    }
}

function deleteEvent(elem) {
    while (elem.tagName !== 'LI') {
        elem = elem.parentElement;
    }
    elem.remove();
}

function closeCollapsible(elem) {
    while (elem.tagName !== 'LI') {
        elem = elem.parentElement;
    }
    let elems = elem.parentElement.children;
    for (let i = 0; i < elems.length; i++) {
        if (elems[i] == elem) {
            const instance = M.Collapsible.getInstance(elem.parentElement);
            instance.close(i);
            break;
        }
    }
}

function submit() {
    const data = {};
    data['year'] = 2019;
    data['title'] = document.getElementById('calendar_title').value;

    const events = [];
    const lis = document.querySelectorAll('.events li');
    for (let i = 0; i < lis.length; i++) {
        const li = lis[i];
        const event = {};
        event['title'] = li.querySelector('.event_title').value;

        // april
        const april = {};
        april['month'] = 4;
        april['days'] = getSelectedDate(li, 4);

        // may
        const may = {};
        may['month'] = 5;
        may['days'] = getSelectedDate(li, 5);

        event['dates'] = [april, may];

        event['color'] = window.getComputedStyle(li.querySelector('.color-picker .selected')).backgroundColor;

        event['shadow'] = li.querySelector('.shadow .shadow_checkbox input[type="checkbox"]').checked;

        event['start'] = li.querySelector('.time .start input').value;

        event['end'] = li.querySelector('.time .end input').value;

        event['place'] = li.querySelector('.place input').value;

        events.push(event);
    }
    data['events'] = events;

    const json = JSON.stringify(data);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/generate');
    xhr.onload = function () {
        if (this.status == 200) {
            // const tab = window.open();
            // tab.document.open();
            // tab.document.write(this.responseText);
            // tab.document.close();
            let div = document.createElement('div');
            div.classList.add('canvas');
            div.classList.add('card');
            div.innerHTML = this.responseText;

            let cardAction = document.createElement('div');
            cardAction.classList.add('card-action');
            cardAction.innerHTML = '<a onclick="clearCalendar(this)" class="btn btn-outlined clear">' +
                '   <span>clear</span>' +
                '   <i class="material-icons left">close</i>' +
                '</a>' +
                '<a onclick="downloadCalendarImage(this)" class="btn right download-image">' +
                '   <span>Download Image</span>' +
                '   <i class="material-icons left">image</i> ' +
                '</a>' +
                '<a onclick="downloadIcal(this)" class="btn btn-outlined right download-ical" json=\''+json+'\'>' +
                '   <span>Export .ical</span>' +
                '   <i class="material-icons left">event_note</i> ' +
                '</a> ';
            div.appendChild(cardAction);

            document.querySelector('body .canvases').appendChild(div);
            div.scrollIntoView();
        }
    };
    xhr.send(json);
}

function getSelectedDate(li, month) {
    const selectedSpans = li.querySelectorAll('.calendars .calendar[month="' + month + '"] td.selected span');
    const selectedDate = [];
    for (let i = 0; i < selectedSpans.length; i++) {
        selectedDate.push(Number(selectedSpans[i].innerHTML));
    }
    return selectedDate;
}

function clearCalendar(elem) {
    while (!elem.classList.contains('canvas')) {
        elem = elem.parentElement;
    }
    elem.remove();
}

function downloadIcal(elem) {
    let json = JSON.parse(elem.getAttribute('json'));
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/ical');
    xhr.onload = function () {
        if (this.status === 200) {
            var blob = new Blob([this.responseText], {type: 'text/calendar'}); // バイナリデータを作ります。
            // それ以外はaタグを利用してイベントを発火させます
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.target = '_blank';
            a.download = json['title'] + '.ical';
            a.click();
        }
    }
    xhr.send(JSON.stringify(json));
}

function downloadCalendarImage(elem) {
    while (!elem.classList.contains('canvas')) {
        elem = elem.parentElement;
    }
    const canvasElem = document.getElementById('canvas');
    const linkElem = document.getElementById('download_link');

    html2canvas(elem).then(canvas => {
        canvasElem.src = canvas.toDataURL();
        linkElem.href = canvas.toDataURL('image/png');
        linkElem.download = 'table.png';
        linkElem.click();
    });
}