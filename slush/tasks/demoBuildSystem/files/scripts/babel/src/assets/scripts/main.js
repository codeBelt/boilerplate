import App from './App';

/*

 ╔══════════════════════════════════════════════════════════════════════════════════════╗
 ║ Naming Convention                                                                    ║
 ╠══════════════════════════════════════════════════════════════════════════════════════╣
 ║ Anytime JavaScript interact with an element. Prepend the selector name with a 'js-'. ║
 ║ - Example: js-someButton                                                             ║
 ║                                                                                      ║
 ║ Name the selector the same name as the view.                                         ║
 ║ - Example: SomeView would have a selector named js-SomeView                          ║
 ╚══════════════════════════════════════════════════════════════════════════════════════╝

 The only purpose of this file is to kick off your application's top-level
 controller at the appropriate time. All other code should be written as
 separate modules in their own files.

 */

window.app = new App();
window.app.init();
