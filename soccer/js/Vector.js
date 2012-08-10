/**
 * Helper vector functions
 */
define(function () {
    this.normalize = function (vector) {
        var magnitude = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
        return (magnitude === 0) ? [0, 0] : [vector[0] / magnitude, vector[1] / magnitude];
    }

    this.truncate = function (vector, max) {
        var magnitude = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
        if (magnitude > max) {
            return [vector[0] * (max / magnitude), vector[1] * max / magnitude];
        }
        return [vector[0], vector[1]];
    }

    this.length = function (a) {
        return Math.sqrt(lengthSquared(a));
    }

    this.lengthSquared = function (a) {
        return a[0] * a[0] + a[1] * a[1];
    }

    this.distance = function (a, b) {
        return Math.sqrt(distanceSquared(a, b));
    }

    this.distanceSquared = function (a, b) {
        return (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]);
    }

    this.dotProduct = function (a, b) {
        return a[0] * b[0] + a[1] * b[1];
    }
    return this;
});