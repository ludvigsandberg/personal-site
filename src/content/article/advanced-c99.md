---
title: 'Advanced C99'
date: '2026-01-11'
---

wip
<br /><br />

```c
#define xarr_insert_raw_n(A, I, N)                                            \
    do {                                                                      \
        assert((I) <= xalen(A));                                              \
                                                                              \
        if (xalen(A) + (N) > xacap(A)) {                                      \
            xacap(A) = (xalen(A) + (N)) * 2;                                  \
                                                                              \
            xgeneric_assign(                                                  \
                (A), (size_t *)(realloc((size_t *)(A) - 2,                    \
                                        2 * sizeof(size_t) +                  \
                                            xacap(A) * sizeof((A)[0]))) +     \
                         2);                                                  \
        }                                                                     \
                                                                              \
        if ((I) != xalen(A)) {                                                \
            memmove((A) + (I) + (N), (A) + (I),                               \
                    (xalen(A) - (I)) * sizeof((A)[0]));                       \
        }                                                                     \
                                                                              \
        xalen(A) += (N);                                                      \
    } while (0)
```
