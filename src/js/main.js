import $ from "jquery"
import selector from "./module/selector"
import slider from "./module/slider"

$(window).on("load styleguide:onRendered", () => {
  selector()
  slider()
})