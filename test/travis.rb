#!/usr/bin/env ruby
# Encoding: utf-8

require_relative 'test-framework'

describe "Overriding layouts" do
  it "should replace the default layouts with the new ones" do
    find "Initial layouts and sizes: (x: 800px, z: 1200px)"
  end
  it "should update the list of layout names" do
    find "Initial layout names: x, z"
  end
  it "should remove gutter for layout m" do
    find "Gutter M exists: false"
  end
  it "should always keep a default gutter width" do
    find "Default gutter exists: true"
  end
end

describe "Adding layouts in different ways" do
  it "should order them from the narrowest to the widest" do
    find "Layout names: a, b, c, x, y, z" and
    find "Layouts: (a: 340px, b: 365px, c: 372px, x: 800px, y: 1100px, z: 1200px)"
  end
  it "should order gutters from the narrowest to the widest layout" do
    find "Gutters: (default: 10px, y: 20px)" and
    find "Gutters: (default: 10px, b: 30px, y: 20px)"
  end
end

describe "Adding a layout *without* a gutter" do
  it "should add that layout" do
    find "Layout names: a,"
  end
  it "should make that layout inherit from the previous' layout gutter" do
    find "Gutter a: 10px"
  end
end

describe "Adding a layout *with* a gutter" do
  it "should be assigned this gutter" do
    find "Gutter y: 20px"
  end
  it "should impact wider layouts's gutters" do
    find "Gutter z: 20px"
  end
  it "should not change narrower layouts's gutters" do
    find "Gutter a in y: 10px"
  end
end

describe "Maximum width of a layout" do
  it "should be equivalent to the following layout's width" do
    find "a: 340px, x: 800px" and find "Max-width a: 800px"
  end
  it "should be its own width for the widest layout" do
    find "z: 1200px" and find "Max-width z: 1200px"
  end
end

describe "Resetting gutters to only a default" do
  it "should give all layouts the same gutter" do
    find "Gutter a after reset: 20px" and
    find "Gutter b after reset: 20px" and
    find "Gutter c after reset: 20px" and
    find "Gutter x after reset: 20px" and
    find "Gutter y after reset: 20px"
  end
end

describe "oGridColspan" do
  it "should return a percentage value when passed number of columns" do
    find "width: 50%", "div { width: oGridColspan($span: 6); }".sass_to_css
  end
  it "should accept a custom number of columns" do
    find "width: 50%", "div { width: oGridColspan($span: 1, $total-cols: 2); }".sass_to_css
  end
  it "should return a percentage value when passed a fraction" do
    find "width: 50%", "div { width: oGridColspan(1/2); }".sass_to_css
  end
  it "should return percentage values for each of the human-friendly keywords" do
    find "Human-friendly colspans: (full-width: 100%, one-half: 50%, one-third: 33.33333%, two-thirds: 66.66667%, one-quarter: 25%, three-quarters: 75%)"
  end
end
