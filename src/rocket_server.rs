use std::path::{PathBuf, Path};

use rocket::response::NamedFile;
use rocket_contrib::templates::Template;
use rocket::config::{Config, Environment};
use rocket::Request;

// serve index page
#[get("/")]
fn index() -> Option<NamedFile> {
    NamedFile::open(Path::new("pages/index.html")).ok()
}

#[get("/index.css")]
fn index_css() -> Option<NamedFile> {
    NamedFile::open(Path::new("pages/index.css")).ok()
}

#[get("/index.js")]
fn index_js() -> Option<NamedFile> {
    NamedFile::open(Path::new("pages/index.js")).ok()
}

#[post("/generate", data = "<string>")]
fn generate_calc(string: String) -> String {
    return crate::create_calendar(string);
}

pub fn launch() {
    let config = Config::build(Environment::Development)
        .address("localhost")
        .port(8080)
        .finalize().unwrap();
    rocket::custom(config)
//        .register(catchers![not_found])
        .mount("/", routes![index])
        .mount("/", routes![index_css])
        .mount("/", routes![index_js])
        .mount("/",routes![generate_calc])
//        .attach(rocket_contrib::templates::Template::fairing())
        .launch();
}