import { existsSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';
import config from '~/config/tsParticles.config';

describe('check tsParticle config', () => {
    it('check tsParticle config', () => {
        expect(config).toHaveProperty('fullScreen');
        expect(config).toHaveProperty('particles');
        expect(config).toHaveProperty('emitters');
        expect(config).toHaveProperty('particles.shape.options.image');
    });

    config.particles.shape.options.image.map((img) => {
        it(`check particle image ${img.src}`, () => {
            const file = join(__dirname, '../../../public', img.src);
            expect(existsSync(file)).toBe(true);
        });
    });
});
