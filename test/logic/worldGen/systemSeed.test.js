import { expect } from "chai";
import getSystemSeed, { _internals } from "/logic/worldGen/systemSeed";
import { uint16_t } from "/utility/c_types";

describe("systemSeed", function() {
  describe("_internals", function() {
    describe("#nextSeed()", function() {
      const testSeed = {
        w0: 11,
        w1: 12,
        w2: 13
      };

      it("should rotate w1 to w0", function() {
        const result = _internals.nextSeed(testSeed);
        expect(result.w0).to.equal(testSeed.w1);
      });

      it("should rotate w2 to w1", function() {
        const result = _internals.nextSeed(testSeed);
        expect(result.w1).to.equal(testSeed.w2);
      });

      it("should generate w2 from w0/w1/w2", function() {
        const result = _internals.nextSeed(testSeed);
        expect(result.w2).to.equal(testSeed.w0 + testSeed.w1 + testSeed.w2);
      });

      it("should wrap w0/w1 on uint16 boundaries", function() {
        // wrapping over the uint boundary reduces the value by (maxValue + 1)

        const result = _internals.nextSeed({
          w0: uint16_t.maxValue + testSeed.w0,
          w1: uint16_t.maxValue + testSeed.w1,
          w2: uint16_t.maxValue + testSeed.w2
        });
        expect(result.w0).to.equal(testSeed.w1 - 1);
        expect(result.w1).to.equal(testSeed.w2 - 1);
      });

      it("should wrap w2 on uint16 boundaries", function() {
        // wrapping over the uint boundary reduces the value by (maxValue + 1)
        // this should happen 2 times for the test case:
        // * (+0) all initial values are in range
        // * (+1) w1 + w2 exceeds maxValue
        // * (+1) w0 + (wrapped w1 + w2) exceeds maxValue
        // maxValue is essentially -1 as the next value is 0
        // so, we expect the final value to be
        // :: (w0 = -1) + w1 + w2 - (wraps = 2)

        const halfMax = Math.floor(uint16_t.maxValue / 2);
        const result = _internals.nextSeed({
          w0: uint16_t.maxValue,
          w1: halfMax + testSeed.w1,
          w2: halfMax + testSeed.w2
        });
        expect(result.w2).to.equal(-1 + testSeed.w1 + testSeed.w2 - 2);
      });
    });
  });

  describe("#getSystemSeed()", function() {
    // ref: TXTELITE.C base0, base1, base2
    const testSeed = {
      w0: 0x5a4a,
      w1: 0x0248,
      w2: 0xb753
    };

    // ref: TXTELITE.C output
    const expectedSeed = {
      w0: 52608,
      w1: 39096,
      w2: 31261
    };

    // ref: TXTELITE.C output
    const expectedPairs = [46, 38, 26, 48];

    it("should return the current seed value", function() {
      const result = getSystemSeed(testSeed);
      expect(result).to.have.property("current");
      expect(result.current.w0).to.equal(testSeed.w0);
      expect(result.current.w1).to.equal(testSeed.w1);
      expect(result.current.w2).to.equal(testSeed.w2);
    });

    it("should return the next seed value", function() {
      const result = getSystemSeed(testSeed);
      expect(result).to.have.property("next");
      expect(result.next).to.deep.equal(expectedSeed);
    });

    it("should return four intermediate values", function() {
      const result = getSystemSeed(testSeed);
      expect(result.current.pair1).to.equal(expectedPairs[0]);
      expect(result.current.pair2).to.equal(expectedPairs[1]);
      expect(result.current.pair3).to.equal(expectedPairs[2]);
      expect(result.current.pair4).to.equal(expectedPairs[3]);
    });
  });
});
