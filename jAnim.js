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

    obj.opacity = function(to) {
        this.animPropertyObjects.opacity = this.createAnimPropertyObject(
                                                'opacity',
                                                '',
                                                this.getCurrentPropValue('opacity'),
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
                propertyObj.currentValue = propertyObj.startValue
                                            + ((propertyObj.endValue - propertyObj.startValue) * easedFraction);
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
        this.element.style[propObj.property] = propObj.currentValue + propObj.suffix;
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