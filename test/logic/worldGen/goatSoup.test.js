import { expect } from "chai";
import getSystemDescription, { _internals } from "/logic/worldGen/goatSoup";

describe("systemSeed", function() {
  describe("_internals", function() {
    describe("#generateGoatSoup", function() {
      it("should pass through ASCII characters 0-127", function() {
        const ascii = [...Array(128).keys()]
          .map(x => String.fromCharCode(x))
          .join("");

        const { result } = _internals.generateGoatSoup(ascii, {}, {});

        expect(result).to.equal(ascii);
      });

      it("should recursively generate a description snippet for characters 128-163", function() {
        // ref: TXTELITE.C output  (info LAVE)
        const seed = { a: 178, b: 165, c: 234, d: 103 };
        const { result } = _internals.generateGoatSoup("\x8A", {}, seed);

        expect(result).to.equal("its vast rain forests");
      });

      it("should substitute the planet name for 0xB0", function() {
        const { result } = _internals.generateGoatSoup(
          "\xB0",
          { name: "LAVE" },
          {}
        );

        expect(result).to.equal("Lave");
      });

      it("should substitute the planet name with -ian suffix for 0xB1", function() {
        const { result } = _internals.generateGoatSoup(
          "\xB1",
          { name: "LAVE" },
          {}
        );

        expect(result).to.equal("Lavian");
      });

      it("should substitude a random name for 0xB2", function() {
        // ref: TXTELITE.C output  (info ARARUS)
        const seed = { a: 71, b: 8, c: 252, d: 26 };

        const { result } = _internals.generateGoatSoup("\xB2", {}, seed);

        expect(result).to.equal("Esoneril");
      });
    });
  });

  describe("#getSystemDescription()", function() {
    it("should describe the Lavian tree grub", function() {
      // ref: TXTELITE.C output  (info LAVE)
      const seed = { a: 156, b: 20, c: 29, d: 21 };

      const lave = {
        name: "LAVE",
        goatsoupseed: seed
      };

      const systemDescription = getSystemDescription(lave);

      expect(systemDescription).to.equal(
        "Lave is most famous for its vast rain forests and the Lavian tree grub."
      );
    });
  });
});
