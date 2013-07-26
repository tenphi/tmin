'use strict';

describe('basic usage |', function() {

  it('create an empty tag tag', function() {
    expect(t.div().outerHTML).toBe('<div></div>');
  });

  it('create a tag with attribute and inner text', function() {
    expect(t.a({
      href: 'example.com'
    }, 'link').outerHTML).toBe('<a href="example.com">link</a>');
  });

  it('create a tag with some styles', function() {
    expect(t.span({
      style: {
        width: '100px',
        marginTop: '17px'
      }
    }).outerHTML).toBe('<span style="width: 100px; margin-top: 17px;"></span>');
  });

  it('create a tag with id and classes', function() {
    expect(t.div({
      id: 'id',
      class: ['class1', 'class2']
    }).outerHTML).toBe('<div id="id" class="class1 class2"></div>');
  });

  it('create nested tags', function() {
    expect(t.div(t.span()).outerHTML).toBe('<div><span></span></div>');
    expect(t.div(t.span).outerHTML).toBe('<div><span></span></div>');
  });

  it('create a collection', function() {
    var container = document.createElement('div');
    container.appendChild(t(t.div(), t.span()));
    expect(container.innerHTML).toBe('<div></div><span></span>');
    var container = document.createElement('div');
    container.appendChild(t(t.div, t.span));
    expect(container.innerHTML).toBe('<div></div><span></span>');
  });

});

describe('complex usage', function() {

  it('create a collection within a collection', function() {
    var container = document.createElement('div');
    container.appendChild(t(t.div, t(t.span, t.span('text'))));
    expect(container.innerHTML).toBe('<div></div><span></span><span>text</span>');
  });

  it('create a tag with data', function() {
    expect(t.div({
      data: 'data'
    }).outerHTML).toBe('<div data="data"></div>');

    expect(t.div({
      class: 'user',
      data: {
        name: 'Name',
        homeAddress: 'City'
      }
    }).outerHTML).toBe('<div class="user" data-name="Name" data-home-address="City"></div>');
  });

});