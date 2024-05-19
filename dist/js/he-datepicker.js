/**
 * Jewish Datepicker 1.0.0
 * Jewish Datepicker with amazing ui
 * https://imStudiomM.co.il
 *
 * Copyright 2023 Shahar Avital | Studio M
 *
 * Released under the MIT License
 *
 */

// http://he-datepicker.laragon.host/

class JewishDatepicker {


    constructor(selector, settings) {

        // args
        this.element = document.querySelector(selector),

        this.settings = settings;

        if (settings && typeof settings === 'object' ) {
            this.color = settings.color ? settings.color : '#9c27b0';
            this.startDate = settings.startDate ? settings.startDate : false;
            this.endDate = settings.endDate ? settings.endDate : false;
            this.israel = settings.israel ? settings.israel : true;
            this.hideHeader = settings.hideHeader ? settings.hideHeader : false;
        }

        // vars
        this.uuid =  Date.now();
        this.selector =  'datepicker_id_' + this.uuid;

        this.d = new Date();
        this.tDay = this.d.getDate();
        this.tDay = (this.tDay < 10) ? '0' + this.tDay.toString() : this.tDay.toString();
        this.tmanth = this.d.getMonth()+1;
        this.tmanth = (this.tmanth < 10) ? '0' + this.tmanth.toString() : this.tmanth.toString();
        this.today = `${this.tDay}-${this.tmanth}-${this.d.getFullYear()}`;

        this.tnext31dayes = new Date();
        this.tnext31dayes.setDate(this.tnext31dayes.getDate()+31);
        this.tnext31dayesDay = this.tnext31dayes.getDate();
        this.tnext31dayesDay = (this.tnext31dayesDay < 10) ? '0' + this.tnext31dayesDay.toString() : this.tnext31dayesDay.toString();
        this.tnext31dayesmanth = this.tnext31dayes.getMonth()+1;
        this.tnext31dayesmanth = (this.tnext31dayesmanth < 10) ? '0' + this.tnext31dayesmanth.toString() : this.tnext31dayesmanth.toString();
        this.tnext31dayesDate = `${this.tnext31dayesDay}-${this.tnext31dayesmanth}-${this.tnext31dayes.getFullYear()}`;

        this.tprev31dayes = new Date();
        this.tprev31dayes.setDate(this.tprev31dayes.getDate()-31);
        this.tprev31dayesDay = this.tprev31dayes.getDate();
        this.tprev31dayesDay = (this.tprev31dayesDay < 10) ? '0' + this.tprev31dayesDay.toString() : this.tprev31dayesDay.toString();
        this.tprev31dayesmanth = this.tprev31dayes.getMonth()+1;
        this.tprev31dayesmanth = (this.tprev31dayesmanth < 10) ? '0' + this.tprev31dayesmanth.toString() : this.tprev31dayesmanth.toString();
        this.tprev31dayesDate = `${this.tprev31dayesDay}-${this.tprev31dayesmanth}-${this.tprev31dayes.getFullYear()}`;

        
        this.CurrentHeYear = 0;
        this.CurrentHeMonth = '';
        
        // run
        this.generateHtml();
        this.wrapper = document.querySelector('#' + this.selector);

        
        this.getIniData();
        this.initialize();
        this.setPostion();
        this.setfirstTiem = false;
        //console.log(this.settings);
    }

    generateHtml(){

        let html = '<div class="jewish_datepicker_inner">';

                html += `<header class="jewish_datepicker_header ${ this.hideHeader ? 'hide' : '' }">`;
                    html += '<div class="j_date"></div>';
                    html += '<div class="g_date"></div>';    
                html += '</header>';

                html += '<nav class="jewish_datepicker_nav">';
                    //html += '<button class="jewish_datepicker_nav_prev"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYEAQAAAAa7ikwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQfmCRwKOTreCQm3AAABU0lEQVRIx63TP0/CQBzG8eeujnQCRiF9AxDDYuhISGokAkNHExw07r4Aw4rxDTg1dmMlWKIkJE4uDNC5TCzkBmIadbu6EauH/XO98dfr93O55AgE61ErlYL70Qivqko/u93zh8UCKRcVDQPmOPArFRxpGnenU/uqWs0MuA0ohVcs7gbXhYIM8gfoE87pZaeDY98PIe+zmWXVakkBsu+DfVav87vJBG+quhs+bbfBSbPZ683n0kBWCInaIItEArJILEAGiQ2kRRIBaZDEAABYA10nbccJIfZ6vXopl/uE8597aeI6AEWjFCYJH+40HE4NWANd55XxGDe53G5oMMafW63fp098RcKrMRjjvUbjwnFd0T+xgTTx2EDaeCxAJh4JyMb/BbKI7wWyiguB4VBRvj42G9B8XjYOCB6aaXKONmNZxIUAIUFwUDcMqMslDj1PJg4A30srAv61Xn7dAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTA5LTI4VDEwOjU3OjU4KzAwOjAwLisraQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wOS0yOFQxMDo1Nzo1OCswMDowMF92k9UAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjItMDktMjhUMTA6NTc6NTgrMDA6MDAIY7IKAAAAAElFTkSuQmCC" alt="prev_month"></button>';
                    html += '<select class="j_year" name="j_year"></select>';
                    html += '<select class="j_month" name="j_month"></select>';
                    //html += '<button class="jewish_datepicker_nav_next"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYEAQAAAAa7ikwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQfmCRwKOgw6ns/tAAABYUlEQVRIx2NkoAAsTtPX/8e1fj2D3efPjMW+vnH3Hz1CV8NEkeGX9+xhMFRUZPisp/d/3bZt2NSRZQHc8AwREbigl4hI/X8mDPNItgCr4R+/fv33LCKikfHfP3T1jFQxPNfHJ5HxwAFseoi2gBzDibaAXMOJsoASwwlaQKnheC2ghuE4LaCW4QwMDAzM6AL1/5mYBP6cOcOgJyEBF7T4/Pn/VQ+PRJvDh0kxnIEBV0bzQcswoYyMzIpMZOV6DE2NjP/+/WN1c2PQfvECLljMw/PPc8eOhZWOjqRagDOS5//X0GA6u38/w1WkoAr+9o2h1ccnvn3/footoJYlBDMapZYQVVRQYgnRhR25lpBUXJNjCUkWkGMJyZknkfHGjX+1bm4MHq9fwwXXcnExHFi1atUqZoySgazcmbj98uV/Cc7OKJZsffMmNBSzyqQIzPfU1V2kfffuwnUXLy7VkJfHpgYAtecAEIyWifUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDktMjhUMTA6NTg6MTIrMDA6MDD/GiFQAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA5LTI4VDEwOjU4OjEyKzAwOjAwjkeZ7AAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMi0wOS0yOFQxMDo1ODoxMiswMDowMNlSuDMAAAAASUVORK5CYII=" alt="next_month"></button>';
                html += '</nav>';

                html += '<section class="jewish_datepicker_section">';
                    html += '<div class="jewish_datepicker_section_week">';
                        html += '<span class="jewish_datepicker_week_day jewish_dp_day_1">ראשון</span>';
                        html += '<span class="jewish_datepicker_week_day jewish_dp_day_2">שני</span>';
                        html += '<span class="jewish_datepicker_week_day jewish_dp_day_3">שלישי</span>';
                        html += '<span class="jewish_datepicker_week_day jewish_dp_day_4">רביעי</span>';
                        html += '<span class="jewish_datepicker_week_day jewish_dp_day_5">חמישי</span>';
                        html += '<span class="jewish_datepicker_week_day jewish_dp_day_6">שישי</span>';
                        html += '<span class="jewish_datepicker_week_day jewish_dp_day_7">שבת</span>';
                    html += '</div>';

                    html += '<div class="jewish_datepicker_section_month"></div>';
                html += '</section>';

                html += '<footer class="jewish_datepicker_footer">';
                    html += '<button class="jewish_datepicker_footer_today">היום</button>';
                    html += '<button class="jewish_datepicker_footer_cancel">ביטול</button>';
                    html += '<button class="jewish_datepicker_footer_apply">אישור</button>';
                html += '</footer>';

        html += '</div>';

            if (  this.color ) {
                html += `<style>#${this.selector}{--main-color: ${this.color};}</style>`;
            }

        let wrapper = document.createElement("div");
            wrapper.id = this.selector;
            wrapper.classList.add("jewish_datepicker_wrapper", "off");
            wrapper.innerHTML = html;

        document.querySelector('body').appendChild(wrapper);


    }

    getIniData(){



        // frontend_ajax_object.api_url + `?d=${ this.d.getDate() }&m=${ this.d.getMonth() + 1  }&y=${ this.d.getFullYear() }&t=g`
        let start = `${this.tprev31dayes.getFullYear()}-${this.tprev31dayesmanth}-01`;
        let end = `${this.tnext31dayes.getFullYear()}-${this.tnext31dayesmanth}-01`;

        let CurrentDay, CurrentHeDayArr;

        //fetch( `https://www.hebcal.com/converter?cfg=json&start=${start}&end=${end}&lg=he-x-NoNikud&maj=on&yto=on&o=off` )
        fetch( `https://www.hebcal.com/hebcal?cfg=json&v=1&start=${start}&end=${end}${ this.israel ? '&i=on' : ''}&nx=on&d=on&lg=he&maj=on&min=on&s=on&leyning=off` )
            .then(response => response.json())
            .then((result) =>  {

                //console.log(result);

                // get Current He Month & Year
                result.items.forEach(( element, index ) => {
                    if( element.date === `${this.d.getFullYear()}-${this.tmanth}-${this.tDay}` && element.category === "hebdate") {

                        //console.log(element);

                        CurrentDay = element;
                        CurrentHeDayArr = element.title_orig.split(' ');

                        this.CurrentHeYear = parseInt(CurrentHeDayArr[CurrentHeDayArr.length - 1]);
                        this.CurrentHeMonth = element.heDateParts.m;

                    }

                });

                // set html in palce
                this.wrapper.querySelector('select.j_year').innerHTML = this.get_years_select_html(this.CurrentHeYear);
                this.wrapper.querySelector('select.j_month').innerHTML = this.get_months_select_html(this.CurrentHeYear, this.CurrentHeMonth);
                this.wrapper.querySelector('.jewish_datepicker_section_month').innerHTML = this.get_calendar_html(result.items, CurrentDay, this.CurrentHeMonth);

                // select today
                let today = this.wrapper.querySelector('.today');
                if( today ) {
                    this.select_day(today);
                }
                
 

            })
            .catch(error => console.log('error', error));
    }

    initialize(){


        // vars
        let $this = this;
        let element = this.element;
        let wrapper = this.wrapper;
        let today = this.today;
        let select_month = wrapper.querySelector('select.j_month');
        let select_year = wrapper.querySelector('select.j_year');
        let month_wrapper = wrapper.querySelector('.jewish_datepicker_section_month');
        let select_day_fn = this.select_day.bind(this);

        let get_years_select_html = this.get_years_select_html.bind(this);
        let get_months_select_html = this.get_months_select_html.bind(this);
        let get_calendar_html = this.get_calendar_html.bind(this);

        let israel = this.israel;
        

        //let setfirstTiem = this.setfirstTiem;
        //let getIniData = this.getIniData;

        // Event Listener
        select_month.addEventListener('change', selectChange);
        select_year.addEventListener('change', selectChange);

        wrapper.querySelector('button.jewish_datepicker_footer_today').addEventListener('click',this.getIniData.bind(this))
        wrapper.querySelector('button.jewish_datepicker_footer_cancel').addEventListener('click', cancel)
        wrapper.querySelector('button.jewish_datepicker_footer_apply').addEventListener('click', apply)

    
        function selectChange(event){

            function addZero(number) {
                number = parseInt(number);
                return number < 10 ? '0' + number.toString() : number.toString();
            }

 
            month_wrapper.innerHTML = '';
            
            let month = wrapper.querySelector('select.j_month').value;
            let year = wrapper.querySelector('select.j_year').value;
            


            fetch( `https://www.hebcal.com/converter?cfg=json&hy=${year}&hm=${month}&hd=1&h2g=1&strict=1${ israel ? '&i=on' : ''}` )
                .then(response => response.json())
                .then((result) =>  {

                    return [
                        result.gy,
                        addZero(result.gm), 
                        addZero(result.gd),
                    ];
                    
                    
                })
                .then((geDat) =>  {

                    let strat = geDat.join('-');

                    let next31 = new Date(strat);
                    next31.setDate(next31.getDate()+31);
                    next31 = [
                        next31.getFullYear(),
                        addZero(next31.getMonth() + 1),
                        addZero(next31.getDate()),
                    ];

                    let end = next31.join('-');

                    return [strat, end];

                })
                .then((startEnd) =>  {
                    return fetch( `https://www.hebcal.com/hebcal?cfg=json&v=1&start=${startEnd[0]}&end=${startEnd[1]}${ israel ? '&i=on' : ''}&nx=on&d=on&lg=he&maj=on&min=on&s=on&leyning=off` )
                })
                .then(response => response.json())
                .then((result) =>  {


                    let CurrentDay = result.items[0],
                        CurrentHeDayArr = result.items[0].title_orig.split(' '),
                        CurrentHeYear = parseInt(CurrentHeDayArr[CurrentHeDayArr.length - 1]),
                        CurrentHeMonth = result.items[0].heDateParts.m;
    

                    select_year.innerHTML = get_years_select_html(CurrentHeYear);
                    select_month.innerHTML = get_months_select_html(CurrentHeYear, CurrentHeMonth);
                    month_wrapper.innerHTML = get_calendar_html(result.items, CurrentDay, CurrentHeMonth);

                    /* let today = wrapper.querySelector('.today');
                    if( today ) {
                        this.select_day(today);
                    } */

           
                    
                })
                        
            .catch(error => console.log('error', error));


            

        
            /* fetch( frontend_ajax_object.api_url + `?d=1&m=${month}&y=${year}&t=j`)
            .then(response => response.json())
            .then((result) =>  { 


                select_year.innerHTML = result.select_years_html;
                select_month.innerHTML = result.select_months_html;
                month_wrapper.innerHTML = result.calendar_html;

                let day = month_wrapper.querySelector(`.jewish_datepicker_month_day[data-full="${today}"]`);
                month_wrapper.querySelector('.jewish_datepicker_month_day:last-child[data-h_day="א"]').remove();
           
                //let days_off = month_wrapper.querySelectorAll('.jewish_datepicker_month_day');
                if( day ) { day.classList.add("today"); }

            })
            .catch(error => console.log('error', error)); */


        }

        function click_on_day(e){
            let ele = e.srcElement;
            if ( ele.classList.contains('jewish_datepicker_month_day') ) {
                select_day_fn(ele);
            }
        }

        function apply(){
            this.closest('.jewish_datepicker_wrapper').classList.add("off");
        }

        function cancel(){
            element.value = '';
            this.closest('.jewish_datepicker_wrapper').classList.add("off");
        }

        month_wrapper.addEventListener('click', click_on_day);

        element.addEventListener('focus', (event) => {
            $this.setfirstTiem = true;
            wrapper.closest('.jewish_datepicker_wrapper').classList.remove("off");
        });


        //console.log(this.jewish_year_int_to_letters(5784));
        //console.log(this.get_years_select_html(5784));
    }

    setPostion(){

        let wrapper = this.wrapper;
        let input = this.element;

        window.addEventListener('resize', reportWindowSize);
        reportWindowSize();

        function reportWindowSize(){


            /* let offsetTop = rect.top;
            let offsetLeft = rect.left;
            let offsetRigth = rect.right;
            let offsetHeight = rect.height;
            let offsetwidth = rect.width; */

            let rect = input.getBoundingClientRect(),
                wrapperRect = wrapper.getBoundingClientRect()

            if ( getComputedStyle( input ).direction === 'rtl' ) {
                wrapper.style.left = `${ rect.left + rect.width - wrapperRect.width }px`;
            }
            else {
                wrapper.style.left = `${ rect.left  }px`;
            }

            wrapper.style.top = `${rect.top + rect.height  }px`;

            
        };



    }

    select_day( dayEelemnt ) {


        let day = dayEelemnt;
        let days = dayEelemnt.closest('.jewish_datepicker_section_month').querySelectorAll('.jewish_datepicker_month_day');
        let jewish_datepicker_inner = dayEelemnt.closest('.jewish_datepicker_inner');

        days.forEach( element => { element.classList.remove('select'); });

        let attr = {
            title       : day.getAttribute('title'),
            full        : day.getAttribute('data-full'),
            h_full      : day.getAttribute('data-h-full'),
            day_of_week : day.getAttribute('data-day_of_week'),
            h_day       : day.getAttribute('data-h_day'),
            h_month     : day.getAttribute('data-h_month'),
            h_year      : day.getAttribute('data-h_year'),
            day         : day.getAttribute('data-day'),
            month       : day.getAttribute('data-month'),
            year        : day.getAttribute('data-year'),
        }

        jewish_datepicker_inner.querySelector('.g_date').innerHTML = attr.full.replaceAll('-', '.');
        jewish_datepicker_inner.querySelector('.j_date').innerHTML = attr.h_full;

        day.classList.add("select");
        if ( !this.setfirstTiem )
            return;

        this.element.value = attr.h_full;
    }

    jewish_year_int_to_letters(gYear){

        let array = gYear.toString().split("");
        let jewish_year_letters = "";

        // thousands
        switch (array[0]) {
            case '1': jewish_year_letters += "א'"; break;
            case '2': jewish_year_letters += "ב'"; break;
            case '3': jewish_year_letters += "ג'"; break;
            case '4': jewish_year_letters += "ד'"; break;
            case '5': jewish_year_letters += "ה'"; break;
            case '6': jewish_year_letters += "ו'"; break;
            case '7': jewish_year_letters += "ז'"; break;
            default:  jewish_year_letters += ""; break;
        }
        jewish_year_letters = '';

        // hundreds
        switch (array[1]) {
            case '1': jewish_year_letters += "ק"; break;
            case '2': jewish_year_letters += "ר"; break;
            case '3': jewish_year_letters += "ש"; break;
            case '4': jewish_year_letters += "ת"; break;
            case '5': jewish_year_letters += "תק"; break;
            case '6': jewish_year_letters += "תר"; break;
            case '7': jewish_year_letters += "תש"; break;
            case '8': jewish_year_letters += "תת"; break;
            case '9': jewish_year_letters += "תתק"; break;
            default: jewish_year_letters += "#"; break;
        }

        // טו טז
        if ( array[2] === "1" ) {
            if ( array.length > 3 ) {
                
                if ( array[3] === "5" ) {
                    jewish_year_letters += 'ט"ו';
                    return jewish_year_letters;
                }

                if ( array[3] === "6" ) {
                    jewish_year_letters += 'ט"ז';
                    return jewish_year_letters;
                }


            }
        }

        // Dozens
        switch (array[2]) {
            case '1': jewish_year_letters += "י"; break;
            case '2': jewish_year_letters += "כ"; break;
            case '3': jewish_year_letters += "ל"; break;
            case '4': jewish_year_letters += "מ"; break;
            case '5': jewish_year_letters += "נ"; break;
            case '6': jewish_year_letters += "ס"; break;
            case '7': jewish_year_letters += "ע"; break;
            case '8': jewish_year_letters += "פ"; break;
            case '9': jewish_year_letters += "צ"; break;
            default: jewish_year_letters += ""; break;
        }

        // unity
        if ( array.length > 3 ) {

            switch (array[3]) {
                case '1': jewish_year_letters += '&quot;א'; break;
                case '2': jewish_year_letters += '&quot;ב'; break;
                case '3': jewish_year_letters += '&quot;ג'; break;
                case '4': jewish_year_letters += '&quot;ד'; break;
                case '5': jewish_year_letters += '&quot;ה'; break;
                case '6': jewish_year_letters += '&quot;ו'; break;
                case '7': jewish_year_letters += '&quot;ז'; break;
                case '8': jewish_year_letters += '&quot;ח'; break;
                case '9': jewish_year_letters += '&quot;ט'; break;
                default: jewish_year_letters += ''; break;
            }
        }

        return jewish_year_letters;

    }

    get_years_select_html(gYear){

        let list = [],
            html = '';
        for (var i = gYear - 10 ; i <= gYear + 20; i++) {
            list.push(i);
        }

        list.forEach(element => {
            html += `<option ${ element === gYear ? 'selected' : '' } data-this-year="${ gYear }" data-this-lamp="${ this.isJewishLeapYear(element) }" value="${ element }">${ this.jewish_year_int_to_letters(element) }</option>`;
            
        });

        //<option '. ( $g_year === (int) $jewish_year ? 'selected' : '' ) .' data-this-year="'. $this_year .'" data-this-lamp="'. $ishLeap .'" value="'. $g_year .'">'. $year_arr['he_name'] .'</option>';

        return html;
    }

    get_months_select_html(gYear, selectedMonth){

        let html = '';
        html +=`<option ${( selectedMonth === 'תשרי' ? 'selected' : '' ) } value="Tishrei">תשרי</option>`;
        html +=`<option ${( selectedMonth === 'חשון' ? 'selected' : '' ) } value="Cheshvan">מר חשון</option>`;
        html +=`<option ${( selectedMonth === 'כסלו' ? 'selected' : '' ) } value="Kislev">כסלו</option>`;
        html +=`<option ${( selectedMonth === 'טבט' ? 'selected' : '' ) } value="Tevet">טבת</option>`;
        html +=`<option ${( selectedMonth === 'שבט' ? 'selected' : '' ) } value="Shvat">שבט</option>`;

        if ( this.isJewishLeapYear( gYear ) ) {
            html +=`<option ${( selectedMonth === "אדר א׳" ? 'selected' : '' ) } value="Adar1">אדר א</option>`;
            html +=`<option ${( selectedMonth === "אדר ב׳" ? 'selected' : '' ) } value="Adar2">אדר ב</option>`;
        }

        else {
            html +=`<option ${( selectedMonth === 'אדר' ? 'selected' : '' ) } value="Adar">אדר</option>`;
        }

        html +=`<option ${( selectedMonth === 'ניסן' ? 'selected' : '' ) } value="Nisan">ניסן</option>`;
        html +=`<option ${( selectedMonth === 'אייר' ? 'selected' : '' ) } value="Iyyar">אייר</option>`;
        html +=`<option ${( selectedMonth === 'סיון' ? 'selected' : '' ) } value="Sivan">סיוון</option>`;
        html +=`<option ${( selectedMonth === 'תמוז' ? 'selected' : '' ) } value="Tamuz">תמוז</option>`;
        html +=`<option ${( selectedMonth === 'אב' ? 'selected' : '' ) } value="Av">אב</option>`;
        html +=`<option ${( selectedMonth === 'אלול' ? 'selected' : '' ) } value="Elul">אלול</option>`;

        return html;

    }

    get_calendar_html(days_arr, currentDayObj, CurrentHeMonth){

        

        // combine holday with days
        let new_DaysArr = [];
        days_arr.forEach((dateobj, index) => {

            if( dateobj.category === "hebdate") {



                let obj_to_push = dateobj;

                // day of week
                obj_to_push.day_of_week = new Date(dateobj.date).getDay() + 1;
                obj_to_push.events = [];

                // Gregorian Date Parts
                let GrDateParts = dateobj.date.split('-');
                obj_to_push.GrDateParts = {y: GrDateParts[0] , m: GrDateParts[1], d:GrDateParts[2] }

                // he Year
                let GrDatePartsInts = dateobj.title_orig.split(' ');
                obj_to_push.heYear = parseInt(GrDatePartsInts[GrDatePartsInts.length - 1]);
                

                // is today
                if( dateobj.date === `${this.d.getFullYear()}-${this.tmanth}-${this.tDay}` ){
                    obj_to_push.isToday = true;
                }


                new_DaysArr.push(obj_to_push);

            } 

            else {
                new_DaysArr[new_DaysArr.length - 1].events.push(dateobj.title);
            }

        
        });

        

        // remove out of month days
        let final_DaysArr = new_DaysArr.filter(function (dateobj, index) {
            return dateobj.heDateParts.m === CurrentHeMonth;
        });

        


        let first_day = final_DaysArr[0].day_of_week -1 ;
        let html = '';

            for (let index = 0; index < first_day; index++) {
                html += '<span class="jewish_datepicker_month_day empty"></span>'; 
            }


            final_DaysArr.forEach( (date_obj, index) => {

                let rtlDate = date_obj.date.split('-');
                rtlDate = `${rtlDate[2]}-${rtlDate[1]}-${rtlDate[0]}`

                html += `<span class="jewish_datepicker_month_day ${ date_obj.isToday ? 'today' : '' }"`; 
                html += ` title="${this.get_day_name(date_obj.day_of_week)} ${ date_obj.hebrew } ${ date_obj.events.length > 0 ? '| ' + date_obj.events.join(" ") : ''  } | ${rtlDate}"`;
                html += ` data-day_of_week="${ date_obj.day_of_week }" `;

                html += ` data-he-day_of_month="${ index }" `;

                html += ` data-full="${ rtlDate }" `;
                html += ` data-h-full="${this.get_day_name(date_obj.day_of_week)} ${date_obj.heDateParts.d} ${date_obj.heDateParts.m} ${date_obj.heDateParts.y}" `;

                html += ` data-holyday="${ date_obj.events.length > 0 ? '1' : '0' }" `;


                html += ` data-h_day="${ date_obj.heDateParts.d }" `;
                html += ` data-h_month="${ date_obj.heDateParts.m }" `;
                html += ` data-h_year="${date_obj.heDateParts.y }" `;

                //html += ` data-day="${ $value['day'] }" `;
                //html += ` data-month="${ $value['month'] }" `;
                //html += ` data-year="${ $value['year'] }" `;

                html += `>${ date_obj.heDateParts.d }</span>`;
                
            

            

            });


        
        return html;

       


    }

    isJewishLeapYear( year ) {

        if (year % 19 == 0 || year % 19 == 3 || year % 19 == 6 ||
            year % 19 == 8 || year % 19 == 11 || year % 19 == 14 ||
            year % 19 == 17)

            return true;
        else
            return false;
    }

    get_day_name( dayInt ) {

        let day;

        switch (dayInt) {
            case 1: day = 'ראשון'; break;
            case 2: day = 'שני'; break;
            case 3: day = 'שלישי'; break;
            case 4: day = 'רביעי'; break;
            case 5: day = 'חמישי'; break;
            case 6: day = 'שישי'; break;
            case 7: day = 'שבת'; break;
            default: day = ''; break;
        }

        return day;

    }



    




}

