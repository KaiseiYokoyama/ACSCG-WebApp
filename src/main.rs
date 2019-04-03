#![feature(proc_macro_hygiene, decl_macro, const_vec_new)]

extern crate chrono;
extern crate serde;
#[macro_use]
extern crate rocket;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
extern crate num_traits;
extern crate num_derive;
extern crate icalendar;

mod structs;
mod rocket_server;

use std::env;
use std::fs::File;
use std::io::{self, Read, Write, BufWriter};
use crate::structs::input::Input;
use crate::structs::web::css::MakerCSSs;
use num_traits::FromPrimitive;

use rocket::{Request, Data, Outcome, Outcome::*};
use rocket::data::{self, FromDataSimple};
use rocket::http::{Status, ContentType};

pub fn main() {
    rocket_server::launch();
}

const LIMIT: u64 = 4096;

pub fn create_calendar(json: String) -> Option<String> {
    // struct Input化した入力ファイル
    let input: Input = match serde_json::from_str(&json) {
        Result::Ok(i) => { i }
        Result::Err(e) => { return None; }
    };

    // html生成
    let html = create_html::create(input);

    return Some(html);
}

pub mod create_html {
    use crate::structs::web::{ToHtml, element::Element, css::CSS};
    use crate::structs::web::css::MakerCSSs;
    use crate::structs::input::Input;
    use crate::structs::date::MonthNames;

    use chrono::{NaiveDate, Weekday, Datelike};
    use num_traits::FromPrimitive;

    /// Input構造体(インプットされたファイルの中身)を受け取って、
    /// それに応じたカレンダーのhtmlを出力する
    pub fn create(input: Input) -> String {
        // js -> document
        let mut document = Element::create("html");

        // body領域を追加
        let mut body = create_body(&input);
        document.append(body);

        // style領域を追加
        let mut style = create_style(&input);
        document.append(style);

        return document.to_html_index_noted(0);
    }

    /// html::head領域を作成する
    fn create_head(input: &Input) -> Element {
        let mut head = Element::create("head");

        // title要素
        let mut title = Element::create("title");
        title.set_text(&input.title);

        // materialize css :css
        let mut materializecss_css = Element::create("link");
        materializecss_css.set_attribute("rel", "stylesheet");
        materializecss_css.set_attribute("href", "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css");

        // materialize css :js
        let mut materializecss_js = Element::create("script");
        materializecss_js.set_attribute("src", "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js");

        // Material icons
        let mut materialicons = Element::create("link");
        materialicons.set_attribute("href", "https://fonts.googleapis.com/icon?family=Material+Icons");
        materialicons.set_attribute("rel", "stylesheet");

        // append to head
        head.append(title);
        head.append(materializecss_css);
        head.append(materializecss_js);
        head.append(materialicons);

        return head;
    }

    /// html::body領域を作成する
    fn create_body(input: &Input) -> Element {
        let mut body = Element::create("body");

        // nav領域を追加
        let mut nav = create_nav(input);
        nav.set_attribute("style", &format!("background-color: {} !important;", input.theme));
        body.append(nav);

        // header領域を追加
        let header = create_header(input);
        body.append(header);

        // main領域を追加
        let mut main = create_main(input);
        body.append(main);

        // footer領域を追加
        let mut footer = create_footer(input);
        footer.set_attribute("style", &format!("background-color: {} !important;", input.theme));
        body.append(footer);

        return body;
    }

    /// html::body::nav領域を作成する
    fn create_nav(input: &Input) -> Element {
        // navigation barのタイトル(ページ最上中央)
        let mut span = Element::create("span");
        span.add_class("title");
        span.set_text(&input.title);

        // タイトルのwrapper
        let mut div = Element::create("div");
        div.add_class("nav-wrapper");
        div.add_class("center-align");
        div.append(span);

        // nav本体
        let mut nav = Element::create("nav");
        nav.append(div);

        return nav;
    }

    /// html::body::main領域を作成する
    fn create_main(input: &Input) -> Element {
        let mut main = Element::create("main");

        // header領域を追加
//        let header = create_header(input);
//        main.append(header);

        // calendar領域を追加
        let calendar = create_calendar(input);
        main.append(calendar);

        // footer領域を追加
//        let footer = create_footer(input);
//        main.append(footer);

        return main;
    }

    /// html::body::main::header領域を作成する
    fn create_header(input: &Input) -> Element {
        let mut header = Element::create("header");
        let mut table = Element::create("table");
        table.add_class("event-description");

        // イベントの説明一覧
        let mut tbody = Element::create("tbody");
        tbody.add_class("border-none");

        for i in 0..input.events.len() {
            // イベントの説明
            let mut tr = Element::create("tr");
//            tr.add_class("collection-item");

            // カレンダー中でイベントを示すマーカーのサンプル
            let mut span_marker = Element::create("span");
            span_marker.set_text(&"10".to_string());
            span_marker.set_attribute("event_index", &format!("{}", i));
            span_marker.add_class("circled");
            let mut td = Element::create("td");
            td.append(span_marker);
            tr.append(td);

            // イベントの名前
            let mut span_description = Element::create("span");
            span_description.set_text(&input.events[i].title);
            span_description.add_class("description");
            let mut td = Element::create("td");
            td.append(span_description);
            tr.append(td);

            let mut span_start = Element::create("span");
            span_start.set_text(&input.events[i].start);
            span_start.add_class("start");
            let mut td = Element::create("td");
            td.append(span_start);
            tr.append(td);

            let mut span_end = Element::create("span");
            span_end.set_text(&input.events[i].end);
            span_end.add_class("end");
            let mut td = Element::create("td");
            td.append(span_end);
            tr.append(td);

            let mut span_place = Element::create("span");
            span_place.set_text(&input.events[i].location);
            span_place.add_class("place");
            let mut td = Element::create("td");
            td.append(span_place);
            tr.append(td);

            // tableにlrを追加
            tbody.append(tr);
        }

        // divに追加
        table.append(tbody);
        // headerに追加
        header.append(table);

        return header;
    }

    /// html::body::main::calendars領域を作成する
    fn create_calendar(input: &Input) -> Element {
        let mut calendars = Element::create("div");
        calendars.add_class("calendars");

        let schedules = calc_calendar(input);

        // scheduleを月ごとに分ける
        let mut schedules_monthly: Vec<Vec<(NaiveDate, Option<usize>)>> = Vec::new();
        let mut m = 0;
        let mut index = 0;
        for schedule in schedules {
            let (day, event) = schedule;
            if m == 0 {
                m = day.month();
                schedules_monthly.push(Vec::new());
            } else if m != day.month() {
                index += 1;
                m = day.month();
                schedules_monthly.push(Vec::new());
            }
            schedules_monthly[index].push((day, event));
        }

        // scheduleを月ごとに処理する
        for schedule_monthly in schedules_monthly {
            let mut calendar = Element::create("div");
            calendar.add_class("calendar");

            // 月の名前を取得
            let (ref first_day, _) = schedule_monthly[0];
            let month_name = format!("{:?}", MonthNames::from_u32(first_day.month0()));

            // calendar-title領域を追加
            let title = create_calendar_title(month_name, input.year);
            calendar.append(title);

            let table = create_calendar_table(input, &schedule_monthly);
            match table {
                Some(t) => {
                    calendar.append(t);
                    // 格納
                    calendars.append(calendar);
                }
                None => {}
            }
        }

        return calendars;
    }

    /// html::body::main::calendars::calendar::calendar-title領域を作成する
    fn create_calendar_title(month: String, year: i32) -> Element {
        let mut title = Element::create("div");
        title.add_class("calendar-title");

        // wrapper
        let mut div = Element::create("div");
        div.add_class("center-align date");

        let mut span_month = Element::create("span");
        span_month.add_class("month");
        span_month.set_text(&month);

        let br = Element::create("br");

        let mut span_year = Element::create("span");
        span_year.add_class("year");
        span_year.set_text(&format!("{}", year));

        div.append(span_month);
        div.append(br);
        div.append(span_year);

        title.append(div);

        return title;
    }

    /// html::body::main::calendars::calendar::table領域を作成する
    fn create_calendar_table(input: &Input, schedule_monthly: &Vec<(NaiveDate, Option<usize>)>) -> Option<Element> {
        let mut table = Element::create("table");
        table.add_class("calendar-body col s12");

        // table headを整備する
        {
            let mut thead = Element::create("thead");
            let mut tr = Element::create("tr");
            // 曜日を日曜日からthに入れていく
            for i in 0..7 {
                let mut th = Element::create("th");

                th.set_text(&format!("{:?}.", Weekday::from_i32((i + 6) % 7).unwrap()));

                th.add_class("center-align");
                // 日曜は赤、土曜は青
                if i == 0 { th.add_class("red-text"); }
                if i == 6 { th.add_class("blue-text"); }

                // 列に追加
                tr.append(th);
            }
            // theadにtrを格納
            thead.append(tr);
            // tableにtheadを格納
            table.append(thead);
        }

        let mut no_event = true;

        // table bodyを整備する
        // カレンダーのマス目の左上から埋めていく
        {
            let mut tbody = Element::create("tbody");
            // scheduleのindex
            let mut index = 0;
            // 行
            for i in 0..5 {
                let mut tr = Element::create("tr");
                // 列
                for j in 0..7 {
                    let mut td = Element::create("td");
                    td.add_class("center-align");
                    // 日曜は赤、土曜は青
                    if j == 0 { td.add_class("red-text"); }
                    if j == 6 { td.add_class("blue-text"); }

                    // 日付の出力を開始する?
                    if index == schedule_monthly.len() {
                        // schedule_monthly[index]がOutBoundsOfIndexになるのを防ぐ
                    } else {
                        let (ref day, ref eve) = schedule_monthly[index];
                        let weekday = day.weekday();

                        if Weekday::from_i32((j + 6) % 7).unwrap() == weekday {
                            // 日付を出力する
                            let mut span = Element::create("span");
                            span.set_text(&format!("{}", index + 1));
                            if index < 9 { span.add_class("digit"); }
                            // イベントがある日を出力したとき
                            if let Some(event_index) = eve {
                                no_event = false;
                                span.set_attribute("event_index", &format!("{}", event_index));
                                span.add_class("circled");
                                // イベントマーカーのshadowが有効なとき
                                if input.events[event_index.clone()].shadow {
                                    span.add_class("z-depth-2");
                                }
                            }

                            td.append(span);
                            index += 1;
                        } else {
                            // 何もしない
                        }
                    }

                    // trにtdを格納
                    tr.append(td);
                }
                // tbodyにtrを格納
                tbody.append(tr);
            }
            table.append(tbody);
        }

        if no_event { return None; }
        return Some(table);
    }

    /// コンピュータ上にカレンダーを再現する
    fn calc_calendar(input: &Input) -> Vec<(NaiveDate, Option<usize>)> {
        // 何月から何月までのcalendarを作成する必要があるのかを探る
        let mut min_month = 12;
        let mut max_month = 1;

        for event in &input.events {
            for date in &event.dates {
                let month = date.month;
                if month > max_month { max_month = month; }
                if month < min_month { min_month = month; }
            }
        }

        // 必要な月を出力
        let mut day = NaiveDate::from_ymd(input.year, min_month, 1);
        let the_day_after_last_day = NaiveDate::from_ymd(input.year, max_month + 1, 1);
        // (日時,イベントid)
        let mut schedules: Vec<(NaiveDate, Option<usize>)> = Vec::new();

        // カレンダーに出力されるdayをvecにしまっておく
        while day != the_day_after_last_day {
            schedules.push((day.clone(), None));
            day = day.succ();
        }

        // イベントとcalendar_vec内のNativeDateを紐付ける
        // iはイベントindex
        for i in 0..input.events.len() {
            let event = &input.events[i];

            // イベント開催日の配列
            let mut event_dates: Vec<NaiveDate> = Vec::new();
            for j in 0..event.dates.len() {
                let date = &event.dates[j];
                for k in 0..date.days.len() {
                    let day = date.days[k];
                    event_dates.push(NaiveDate::from_ymd(input.year, date.month, day));
                }
            }

            // 総当たりでイベント開催日とカレンダーをマッチング
            for j in 0..schedules.len() {
                let (day, _) = schedules[j];
                for k in 0..event_dates.len() {
                    // match
                    if day == event_dates[k] {
                        schedules.remove(j);
                        schedules.insert(j, (event_dates[k], Some(i)));
                    }
                }
            }
        }

        return schedules;
    }

    /// html::body::main::footer領域を作成する
    fn create_footer(input: &Input) -> Element {
        let mut footer = Element::create("footer");

        let mut span_rights = Element::create("span");
        span_rights.set_text("Powered by Amusement Creators 新歓カレンダージェネレータ: @crome_ITF");
        span_rights.add_class("left white-text rights");

        let mut span_address = Element::create("span");
        span_address.set_text(&input.address);
        span_address.add_class("right white-text address");

        let mut span_organizer = Element::create("span");
        span_organizer.set_text(&input.organizer);
        span_organizer.add_class("right white-text organizer");

        footer.append(span_rights);
        footer.append(span_address);
        footer.append(span_organizer);

        return footer;
    }

    /// style領域(css)を追加
    fn create_style(input: &Input) -> Element {
        let mut styles = Element::create("div");
        styles.add_class("styles");

        let mut style_static = create_style_static();
        styles.append(style_static);

        let mut style_dynamic = create_style_dynamic(input);
        styles.append(style_dynamic);

        return styles;
    }

    /// CSSのうち入力(input)によって変化しない部分を出力する
    fn create_style_static() -> Element {
        let mut css_vec: Vec<CSS> = Vec::new();

        let mut css = CSS::create("nav");
        css.push_declaration("box-shadow", "none");
        css.push_declaration("font-family", "Menlo");
        css_vec.push(css);

        let mut css = CSS::create("header");
        css.push_declaration("padding", "20px 0");
        css_vec.push(css);

        let mut css = CSS::create(".event-description");
        css.push_declaration("margin", "0 20px");
        css.push_declaration("padding", "10px 0");
        css.push_declaration("background-color", "rgb(244,245,246)");
        css.push_declaration("border-left", "#ee6e73 solid 3px");
        css_vec.push(css);

        let mut css = CSS::create(".event-description ul.collection, .event-description ul.collection li.collection-item");
        css.push_declaration("border", "none");
        css.push_declaration("background-color", "inherit");
        css_vec.push(css);

        let mut css = CSS::create(".calendar-title");
        css.push_declaration("width", "100%");
        css_vec.push(css);

        let mut css = CSS::create(".calendar-title i");
        css.push_declaration("font-size", "80px");
        css.push_declaration("color", "#e0e0e0");
        css_vec.push(css);

        let mut css = CSS::create(".calendar-title .date");
        css.push_declaration("padding", "10px 0");
        css.push_declaration("color", "#757575");
        css_vec.push(css);

        let mut css = CSS::create(".calendar-title .date .month");
        css.push_declaration("font-size", "25px");
        css_vec.push(css);

        let mut css = CSS::create(".circled");
        css.push_declaration("padding", "10px");
        css.push_declaration("border-radius", "5px");
        css_vec.push(css);

        let mut css = CSS::create(".circled.digit");
        css.push_declaration("padding-right", "14px");
        css.push_declaration("padding-left", "14px");
        css_vec.push(css);

        // todo remove non-static
        let mut css = CSS::create(".circled.red, .circled.blue");
        css.push_declaration("color", "white");
        css_vec.push(css);

        let mut style = String::new();
        for static_css in css_vec {
            style = format!("{}{}", style, static_css.to_html());
        }

        let mut css = Element::create("style");
        css.set_text(&style);

        return css;
    }

    /// CSSのうち入力(input)によって変化する部分を出力する
    fn create_style_dynamic(input: &Input) -> Element {
        let mut css_vec: Vec<CSS> = Vec::new();

        for i in 0..input.events.len() {
            let csss = &mut MakerCSSs::csss_from_colorcode(i as u32, &input.events[i].color, true);
            css_vec.append(csss);
        }

        let mut css = Element::create("style");
        let mut style = String::new();
        for css in css_vec {
            style = format!("{}{}", style, css.to_html());
        }

        css.set_text(&style);

        return css;
    }
}

pub mod create_ical {
    use chrono::*;
    use icalendar::*;
    use super::Input;


    pub fn create(json: String) -> Option<String> {
        // struct Input化した入力ファイル
        let input: Input = match serde_json::from_str(&json) {
            Result::Ok(i) => { i }
            Result::Err(e) => {
                eprintln!("create_ical:parse failed {}", &json);
                return None;
            }
        };

        let mut calendar = Calendar::new();
        for event in &input.events {
            for date in &event.dates {
                for day in &date.days {
                    // start
                    let hour_min_start: Vec<&str> = event.start.as_str().split(":").collect();
                    let hour_min_end: Vec<&str> = event.end.as_str().split(":").collect();
                    if hour_min_start.len() == 2 && hour_min_end.len() == 2 {
                        // 開始時間
                        let hour: u32 = match hour_min_start[0].parse() {
                            Ok(t) => t,
                            Err(_) => { return None; }
                        };
                        let min: u32 = match hour_min_start[1].parse() {
                            Ok(t) => t,
                            Err(_) => { return None; }
                        };
                        let mut native_date_time = NaiveDate::from_ymd(input.year, date.month, day.clone());
                        let utc_date_start = FixedOffset::east(9 * 3600).from_utc_date(&native_date_time).and_hms(hour, min, 0);

                        // 終了時間
                        let hour: u32 = match hour_min_end[0].parse() {
                            Ok(t) => t,
                            Err(_) => { return None; }
                        };
                        let min: u32 = match hour_min_end[0].parse() {
                            Ok(t) => t,
                            Err(_) => { return None; }
                        };
                        let utc_date_end = FixedOffset::east(9 * 3600).from_utc_date(&native_date_time).and_hms(hour, min, 0);

                        // イベント作成
                        let mut event = Event::new()
                            .location(&event.location)
                            .summary(&format!("[{}] {}", &input.organizer, &event.title))
                            .starts(utc_date_start)
                            .ends(utc_date_end)
                            .append_property(Property::new("ORGANIZER", &input.organizer))
                            .append_property(Property::new("CONTACT", &input.address))
                            .done();

                        calendar.add(event);
                    }
                }
            }
        }

        return Some(calendar.to_string());
    }
}
