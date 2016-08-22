var DrawStyle = {
    LINE: 0,
    CANVAS_RIBBON: 1,
    DOM_RIBBON: 2
}
  , Ribbon = function(a, d, f, g) {
    var c = this;
    c.drawStyle = DrawStyle.CANVAS_RIBBON;
    c.fullRibbonWidth = 136;
    c.collapsedRibbonWidth = 70;
    c.width = c.fullRibbonWidth;
    c.pullStrength = 0;
    c.pullSpread = 0;
    c.drivePoint = 0.5;
    c.straightenStrength = 0;
    c.verticalPosition = 0.5;
    c.positionDamping = 0;
    c.canDestruct = !0;
    c.idleSpeed = 0.3;
    c.speed = c.idleSpeed;
    var h, k, l = {}, n = null , p = null , r = 0, q = 1, s = null , w = 0;
    this.yOffsetForce = this.yOffset = 0;
    c.primaryColor = null ;
    var t = c.secondaryColor = null
      , u = null ;
    c.setShouldClear = function(a) {
        t && (t.shouldClear = a)
    }
    ;
    c.clearCanvas = function() {
        t.clear()
    }
    ;
    c.setWidth = function(a, f) {
        c.fullRibbonWidth = a;
        c.collapsedRibbonWidth = f;
        c.width = a;
        q = a / 136;
        for (var d = n; d; )
            d.setLengthMultiplier(q),
            d = d.nextSegment
    }
    ;
    c.advance = function() {
        c.move(c.speed);
        var a = z(c.drivePoint)
          , f = function(a, c) {
            a.setColor();
            a.advance();
            a.applyForces(c)
        }
        ;
        f(a, SegmentAnchorPoint.CENTER);
        for (var d = a.previousSegment; d; )
            f(d, SegmentAnchorPoint.END),
            d = d.previousSegment;
        for (d = a.nextSegment; d; )
            f(d, SegmentAnchorPoint.START),
            d = d.nextSegment;
        if (c.drawStyle == DrawStyle.CANVAS_RIBBON)
            for (d = n; d; )
                d.resetPolygon(),
                d = d.nextSegment
    }
    ;
    c.draw = function() {
        var a = C()
          , f = 5E-4 * (a - c.yOffset);
        c.yOffsetForce *= 0.95;
        c.yOffsetForce += f;
        var f = l.height * Math.pow(1 - c.positionDamping, 2)
          , d = c.yOffset + c.yOffsetForce;
        Math.abs(a - d) > f / 2 && (d += ((0 < a - d ? a - f / 2 : a + f / 2) - d) * Math.max((c.positionDamping - 0.1) / 0.9, 0),
        c.yOffsetForce = d - c.yOffset);
        c.yOffset = d;
        if (c.drawStyle == DrawStyle.LINE) {
            k.clearRect(0, 0, l.width, l.height);
            k.strokeStyle = "#000000";
            k.beginPath();
            a = n;
            for (k.moveTo(a.startPoint.x, l.height / 2 + a.startPoint.y - c.yOffset); a; )
                k.lineTo(a.endPoint.x, l.height / 2 + a.endPoint.y - c.yOffset),
                a = a.nextSegment;
            k.stroke();
            k.closePath();
            for (a = n; a; )
                k.fillStyle = "#FF0000",
                k.beginPath(),
                k.arc(a.endPoint.x, l.height / 2 + a.endPoint.y - c.yOffset, 5, 0, 2 * Math.PI),
                k.fill(),
                k.closePath(),
                a = a.nextSegment
        } else
            c.drawStyle == DrawStyle.CANVAS_RIBBON ? (t.yOffset = c.yOffset,
            t.draw()) : c.drawStyle == DrawStyle.DOM_RIBBON && (u.yOffset = -c.yOffset + l.height / 2,
            u.update())
    }
    ;
    c.move = function(a) {
        for (var f = n; f; )
            f.move(a),
            f = f.nextSegment;
        c.canDestruct && c.destroySegments();
        c.createSegments()
    }
    ;
    c.straighten = function() {
        c.straightenStrength = Math.max(Math.min(c.straightenStrength, 1), 0);
        c.width = c.collapsedRibbonWidth + (c.fullRibbonWidth - c.collapsedRibbonWidth) * (1 - c.straightenStrength);
        var a;
        a = s ? s : z(0.5);
        a.width = c.width;
        a.straightenStrength = Math.min(c.straightenStrength + c.pullStrength, 1);
        a.applyForces(SegmentAnchorPoint.CENTER);
        for (var f = a.nextSegment, d; f; ) {
            f.width = c.width;
            d = 1;
            if (0 < c.pullSpread) {
                d = f.distanceFromSegment(a, SearchDirection.LEFT) / (1 * w);
                var g = 2 * c.pullSpread
                  , h = 2 * g;
                d = d < g ? 1 : d > h ? 0 : 1 - (d - g) / (h - g)
            }
            d *= c.pullStrength;
            f.straightenStrength = Math.min(c.straightenStrength + d, 1);
            f.applyForces(SegmentAnchorPoint.START);
            f = f.nextSegment
        }
        for (f = a.previousSegment; f; )
            f.width = c.width,
            d = 1,
            0 < c.pullSpread && (d = f.distanceFromSegment(a, SearchDirection.RIGHT) / (1 * w),
            g = 2 * c.pullSpread,
            h = 2 * g,
            d = d < g ? 1 : d > h ? 0 : 1 - (d - g) / (h - g)),
            d *= c.pullStrength,
            f.straightenStrength = Math.min(c.straightenStrength + d, 1),
            f.applyForces(SegmentAnchorPoint.END),
            f = f.previousSegment
    }
    ;
    c.setPullPoint = function(a) {
        s = z(a);
        w = r
    }
    ;
    c.clearPullPoint = function() {
        s = null
    }
    ;
    c.destroySegments = function() {
        for (; -800 > n.endPoint.x; )
            t && t.removePolygon(n.polygon),
            u && u.removeSegment(n),
            r -= n.segmentLength,
            n = n.nextSegment,
            n.previousSegment = null ;
        for (; p.startPoint.x > l.width + 800; )
            t && t.removePolygon(p.polygon),
            u && u.removeSegment(p),
            r -= p.segmentLength,
            p = p.previousSegment,
            p.nextSegment = null
    }
    ;
    c.createSegments = function() {
        for (var a = [], f = !1; -600 < n.startPoint.x; ) {
            n = new RibbonSegment(n,c.primaryColor,c.secondaryColor,f);
            n.setLengthMultiplier(q);
            a.push(n);
            for (var d = 0; D(n) && 5 > d; ) {
                d++;
                n = a[0].nextSegment;
                n.previousSegment = null ;
                if (t)
                    for (var g = a.length, h = 0; h < g; h++)
                        t.removePolygon(a[h].polygon);
                if (u)
                    for (g = a.length,
                    h = 0; h < g; h++)
                        u.removeSegment(a[h]);
                a = [];
                n = new RibbonSegment(n,c.primaryColor,c.secondaryColor,!0);
                n.setLengthMultiplier(q);
                a.push(n)
            }
            r += n.segmentLength;
            n.width = c.width;
            n.straightenStrength = Math.max(n.nextSegment.straightenStrength, c.pullStrength);
            n.applyForces(SegmentAnchorPoint.END);
            t && v(n);
            u && u.addSegment(n)
        }
        a = [];
        for (f = !1; p.endPoint.x < l.width + 600; ) {
            p = new RibbonSegment(p,c.primaryColor,c.secondaryColor,f);
            p.setLengthMultiplier(q);
            a.push(p);
            for (d = 0; D(p) && 5 > d; ) {
                d++;
                p = a[0].previousSegment;
                p.nextSegment = null ;
                if (t)
                    for (g = a.length,
                    h = 0; h < g; h++)
                        t.removePolygon(a[h].polygon);
                if (u)
                    for (g = a.length,
                    h = 0; h < g; h++)
                        u.removeSegment(a[h]);
                a = [];
                p = new RibbonSegment(p,c.primaryColor,c.secondaryColor,!0);
                p.setLengthMultiplier(q);
                a.push(p)
            }
            r += p.segmentLength;
            p.width = c.width;
            p.straightenStrength = Math.max(p.previousSegment.straightenStrength, c.pullStrength);
            p.applyForces(SegmentAnchorPoint.START);
            t && v(p);
            u && u.addSegment(p)
        }
    }
    ;
    c.resetSize = function() {
        l.width = h.clientWidth;
        l.height = h.clientHeight;
        t && t.resetSize()
    }
    ;
    c.setColors = function(a, f) {
        c.primaryColor.setRed(a.getRed());
        c.primaryColor.setGreen(a.getGreen());
        c.primaryColor.setBlue(a.getBlue());
        c.secondaryColor.setRed(f.getRed());
        c.secondaryColor.setGreen(f.getGreen());
        c.secondaryColor.setBlue(f.getBlue())
    }
    ;
    c.secondaryColorFromPrimaryColor = function(a) {
        return new Color(a.getHue(),a.getSaturation() + 7,a.getValue() - 19,ColorMode.HSV)
    }
    ;
    c.getCurrentVerticalPosition = function() {
        for (var a = 0, f = 0, d = n; d; )
            a++,
            f += d.startPoint.y,
            f += d.endPoint.y,
            d = d.nextSegment;
        return (f / (2 * a) - c.yOffset + l.height / 2 - c.width / 2) / (l.height - c.width)
    }
    ;
    var v = function(a) {
        a.backface ? t.addPolygonAtDepth(a.polygon, 1) : t.addPolygonAtDepth(a.polygon, 0)
    }
      , z = function(a) {
        for (var c = n; c; ) {
            if (c.endPoint.x / l.width > a || !c.nextSegment)
                return c;
            c = c.nextSegment
        }
    }
      , C = function() {
        for (var a = 0, f = 0, d = n; d; )
            a++,
            f += d.startPoint.y,
            f += d.endPoint.y,
            d = d.nextSegment;
        return f / (2 * a) + (0.5 - c.verticalPosition) * (l.height - c.width)
    }
      , D = function(a) {
        var c;
        c = a.nextSegment ? 0 : 1;
        var f;
        f = 0 == c ? a.nextSegment.nextSegment : a.previousSegment.previousSegment;
        for (var d = 0; f && 6 > d; ) {
            var g;
            g = a.originalStartPoint;
            var h = a.originalEndPoint
              , k = f.originalStartPoint
              , n = f.originalEndPoint
              , p = B(h, g)
              , l = B(n, k)
              , r = F(B(k, g), p)
              , p = F(p, l);
            0 == r && 0 == p ? g = 0 > k.x - g.x != 0 > k.x - h.x != 0 > n.x - g.x != 0 > n.x - h.x || 0 > k.y - g.y != 0 > k.y - h.y != 0 > n.y - g.y != 0 > n.y - h.y : 0 == p ? g = !1 : (h = r / p,
            g = F(B(k, g), l) / p,
            g = 0 <= g && 1 >= g && 0 <= h && 1 >= h);
            if (g)
                return !0;
            f = 0 == c ? f.nextSegment : f.previousSegment;
            d++
        }
        return !1
    }
      , F = function(a, c) {
        return a.x * c.y - a.y * c.x
    }
      , B = function(a, c) {
        var f = {};
        f.x = a.x - c.x;
        f.y = a.y - c.y;
        return f
    }
    ;
    (function(a, f, d, g) {
        h = a;
        h.getContext && (k = h.getContext("2d"));
        g || (g = 1);
        l.width = h.clientWidth;
        l.height = h.clientHeight;
        f && f.substr ? c.primaryColor = new Color(f) : f ? c.primaryColor = f : (c.primaryColor = new Color(255 * Math.random(),255 * Math.random(),255 * Math.random()),
        20 > c.primaryColor.getValue() && c.primaryColor.setValue(20));
        c.secondaryColor = d && d.substr ? new Color(d) : d ? d : c.secondaryColorFromPrimaryColor(c.primaryColor);
        c.drawStyle == DrawStyle.CANVAS_RIBBON && (t = new Flat3dSetup(h,g));
        c.drawStyle == DrawStyle.DOM_RIBBON && (u = new RibbonDOMHolder(h));
        n = new RibbonSegment(null ,c.primaryColor,c.secondaryColor);
        n.setLengthMultiplier(q);
        p = n;
        r += n.segmentLength;
        a = n;
        t && v(a);
        u && u.addSegment(a);
        c.createSegments();
        c.yOffset = C();
        0.5 < Math.random() && (c.speed *= -1)
    })(a, d, f, g)
}
;