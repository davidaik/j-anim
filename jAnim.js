function jAnim(selectorOrEl) {
    var obj = {};
    obj.easings = {
        linear: function(t) {
          return t;
        }
      };
    obj.requestAnimationFrame = window.requestAnimationFrame.bind(window) ||
                        window.mozRequestAnimationFrame.bind(window) ||
                        window.webkitRequestAnimationFrame.bind(window) ||
                        window.msRequestAnimationFrame.bind(window);
    obj.dur = 300;
    obj.ease = obj.easings.linear;
    obj.animPropertyObjects = new Object();
    obj.cancelled = true;

    if(typeof selectorOrEl === 'string')
        obj.element = document.querySelector(selectorOrEl);
    else
        obj.element = selectorOrEl;

    obj.duration = function(millis) {
        this.duration = millis;
        return this;
    }
    obj.easing = function(e) {
        switch(e) {
          case 'linear':
            this.ease = this.easings.linear
        }
        return this;
    }

    obj.getCurrentPropValue = function(prop) {
        return parseInt(window.getComputedStyle(this.element).getPropertyValue(prop));
    }

    // This field stores objects containing info about a CSS property being animated
    obj.createAnimPropertyObject = function(property, suffix, startValue, endValue) {
        return {
            property: property,
            suffix: suffix,
            startValue: startValue,
            endValue: endValue,
            currentValue: startValue
        }
    }

    obj.backgroundColor = function(to) {
        // to must be type rgba(int, int, int, float)
        function getRGBAComponents(rgbaString) {
            // rgbaString ~ rgba(int, int, int, float)
            // returns {r: 0, g: 0, b: 0, a: 0.5}
            var components = rgbaString.replace(/[^\d,.]/g, '').split(',');
            return {r: parseInt(components[0]), g: parseInt(components[1]), b: parseInt(components[2]), a: parseFloat(components[3])};
        }
        var from = getRGBAComponents(window.getComputedStyle(this.element).getPropertyValue('background-color'));
        if(!from.a) from.a = 1;
        to = getRGBAComponents(to);
        if(!to.a) to.a = 1;
        this.animPropertyObjects.backgroundColor = this.createAnimPropertyObject(
                                                'background-color',
                                                '',
                                                from,
                                                to);
        return this;
    }

    obj.opacity = function(to) {
        this.animPropertyObjects.opacity = this.createAnimPropertyObject(
                                                'opacity',
                                                '',
                                                this.getCurrentPropValue('opacity'),
                                                to);
        return this;
    }

    obj.width = function(to) {
        this.animPropertyObjects.width = this.createAnimPropertyObject(
                                                'width',
                                                'px',
                                                this.getCurrentPropValue('width'),
                                                to);
        return this;
    }

    obj.height = function(to) {
        this.animPropertyObjects.height = this.createAnimPropertyObject(
                                                'height',
                                                'px',
                                                this.getCurrentPropValue('height'),
                                                to);
        return this;
    }

    obj.calculateFrame = function() {
        if(this.cancelled) {
            return;
        }

        for(prop in this.animPropertyObjects) {
            this.cancelled = true;
            let propertyObj = this.animPropertyObjects[prop];
            let animatedFraction = (performance.now() - this.startTime) / this.dur;
            let easedFraction = this.ease(animatedFraction)
            if(animatedFraction < 1) {
                this.cancelled = false;
                if(prop == 'backgroundColor') {
                    /*
                    Things are a little different for color properties.
                    Iterate over the keys in propertyObj.currentValue which looks like {r: 0, g: 0, b: 0, a: 0}
                    and update each value.
                    */
                    for(colorComponent in propertyObj.currentValue) {
                        propertyObj.currentValue[colorComponent]
                            = propertyObj.startValue[colorComponent]
                                + ((propertyObj.endValue[colorComponent] - propertyObj.startValue[colorComponent])
                                 * easedFraction);
                    }
                } else {
                    propertyObj.currentValue = propertyObj.startValue
                                            + ((propertyObj.endValue - propertyObj.startValue) * easedFraction);
                }
            } else {
                propertyObj.currentValue = propertyObj.endValue;
            }
            this.applyValue(propertyObj);
        }

        if(!this.cancelled) {
            this.requestAnimationFrame(obj.calculateFrame.bind(this));
        }
    }

    obj.applyValue = function(propObj) {
        if(propObj.property == 'background-color') {
            this.element.style.backgroundColor = 'rgba(' + propObj.currentValue.r + ', '
                                                    + propObj.currentValue.g + ', '
                                                    + propObj.currentValue.b + ', '
                                                    + propObj.currentValue.a + ')';
        } else {
            this.element.style[propObj.property] = propObj.currentValue + propObj.suffix;
        }
    }

    obj.start = function() {
        this.startTime = performance.now();
        this.cancelled = false;
        this.requestAnimationFrame(obj.calculateFrame.bind(this));
    }

    obj.cancel = function() {
        this.cancelled = true;
    }
    return obj;
};