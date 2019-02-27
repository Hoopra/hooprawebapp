
export function matchStrings(s1: string, s2: string, caseSensitive = false): boolean
{
    if (!s1 || !s2) { return true; }
    if (!caseSensitive)
    {
        s1 = s1.toLowerCase(), s2 = s2.toLowerCase();
    }
    return (s1.includes(s2) || s2.includes(s1));
}
