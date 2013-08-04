'use strict';

var td = tmin.dom;
var th = tmin.html;

describe('basic usage |', function() {

  (function() {
    var code = '<div></div>';

    it('dom', function() {
      expect(td.div().outerHTML).toBe(code);
    });

    it('html', function() {
      expect(th.div()).toBe(code);
    });
  })();

  (function() {
    var code = '<a href="example.com">link</a>';

    it('dom: create a tag with attribute and inner text', function() {
      expect(td.a({
        href: 'example.com'
      }, 'link').outerHTML).toBe(code);
    });

    it('html: create a tag with attribute and inner text', function() {
      expect(th.a({
        href: 'example.com'
      }, 'link')).toBe(code);
    });
  })();

  (function() {
    var code = '<span style="width: 100px; margin-top: 17px;"></span>';

    it('dom: create a tag with some styles', function() {
      expect(td.span({
        style: {
          width: '100px',
          marginTop: '17px'
        }
      }).outerHTML).toBe(code);
    });

    it('html: create a tag with some styles', function() {
      expect(th.span({
        style: {
          width: '100px',
          marginTop: '17px'
        }
      })).toBe(code);
    });
  })();

  (function() {
    var code = '<div id="id" class="class1 class2"></div>';

    it('dom: create a tag with id and classes', function() {
      expect(td.div({
        id: 'id',
        class: ['class1', 'class2']
      }).outerHTML).toBe(code);
    });

    it('html: create a tag with id and classes', function() {
      expect(th.div({
        id: 'id',
        class: ['class1', 'class2']
      })).toBe(code);
    });
  })();

  (function() {
    var code = '<div><span></span></div>';

    it('dom: create nested tags', function() {
      expect(td.div(td.span()).outerHTML).toBe(code);
      expect(td.div(td.span).outerHTML).toBe(code);
    });

    it('html: create nested tags', function() {
      expect(th.div(th.span())).toBe(code);
      expect(th.div(th.span)).toBe(code);
    });
  })();

  (function() {
    var code = '<div></div><span></span>';

    it('dom: create a collection', function() {
      var container = document.createElement('div');
      container.appendChild(td(td.div(), td.span()));
      expect(container.innerHTML).toBe(code);
      var container = document.createElement('div');
      container.appendChild(td(td.div, td.span));
      expect(container.innerHTML).toBe(code);
    });

    it('html: create a collection', function() {
      expect(th(th.div(), th.span())).toBe(code);
      expect(th(th.div, th.span)).toBe(code);
    });
  })();

});

describe('complex usage', function() {

  (function() {
    var code = '<div></div><span></span><span>text</span>';

    it('dom: create a collection within a collection', function() {
      var container = document.createElement('div');
      container.appendChild(td(td.div, td(td.span, td.span('text'))));
      expect(container.innerHTML).toBe(code);
    });

    it('html: create a collection within a collection', function() {
      expect(th(th.div, th(th.span, th.span('text')))).toBe(code);
    });
  })();

  (function() {
    var code = '<div class="user" data-name="Name" data-home-address="City"></div>';
    var codeData = '<div data="data"></div>';

    it('dom: create a tag with data', function() {
      expect(td.div({
        data: 'data'
      }).outerHTML).toBe(codeData);

      expect(td.div({
        class: 'user',
        data: {
          name: 'Name',
          homeAddress: 'City'
        }
      }).outerHTML).toBe(code);
    });

    it('html: create a tag with data', function() {
      expect(th.div({
        data: 'data'
      })).toBe(codeData);

      expect(th.div({
        class: 'user',
        data: {
          name: 'Name',
          homeAddress: 'City'
        }
      })).toBe(code);
    });
  })();

});