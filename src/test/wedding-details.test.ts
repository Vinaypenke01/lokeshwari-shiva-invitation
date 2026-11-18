import { describe, it, expect } from 'vitest';
import { getCountdown, weddingDetails } from '@/config/weddingDetails';

describe('Confirmed wedding details for Shiva Kumar & Lokeshwari Devi', () => {
  it('targets 26 November 2026 at 9:16 AM IST (Dhanur Lagnam)', () => {
    expect(weddingDetails.wedding.startsAt).toBe('2026-11-26T09:16:00+05:30');
    expect(new Date(weddingDetails.wedding.startsAt).toISOString()).toBe('2026-11-26T03:46:00.000Z');
    expect(weddingDetails.wedding.lagnam).toBe('Dhanur Lagnam');
    expect(weddingDetails.timezone).toBe('Asia/Kolkata');
  });
  it('calculates exact remaining days, hours, minutes, and seconds', () => {
    expect(getCountdown(Date.parse('2026-11-24T07:14:55+05:30'))).toEqual({
      days: 2,
      hours: 2,
      minutes: 1,
      seconds: 5,
      complete: false,
    });
  });
  it('never returns negative values after the wedding', () => {
    expect(getCountdown(Date.parse('2026-11-27T00:00:00+05:30'))).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      complete: true,
    });
  });
  it('marks the exact Sumuhurtham as complete', () => {
    expect(getCountdown(Date.parse('2026-11-26T09:16:00+05:30')).complete).toBe(true);
  });
  it('preserves the confirmed venue and Google Maps link', () => {
    expect(weddingDetails.mapsUrl).toBe('https://maps.app.goo.gl/jfxgvhpnqdfpWmCQ8?g_st=iw');
    expect(weddingDetails.venueName).toBe('Parimala Convention Hall');
    expect(weddingDetails.venueAddress).toBe('Barkatpura Road, Chitrapuri Colony, Narayanaguda, Hyderabad.');
  });
});
