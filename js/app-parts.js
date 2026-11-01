/* Snehal Tanwar — portfolio app modules.
 *
 * NOTE: index.html ships a pre-bundled React application. These components are
 * the source of the modules injected into that bundle by the build patch, kept
 * here so the new functionality is readable and maintainable.
 *
 * Uses the bundle's own React (`y`), JSX runtime (`U`) and design primitives
 * (`Jd` project card, `qd` video modal) so nothing is duplicated visually.
 */

function snSlug(e) {
  return String(e || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function snProjects() {
  return (Bd || []).filter(function (p) {
    return p && p.title && p.category;
  });
}

function snIn(category) {
  return snProjects().filter(function (p) {
    return p.category === category;
  });
}

/* Resolve CMS image paths: GitHub blob/HTML URLs become raw or local media
   paths, everything else passes through. */
function snImg(src) {
  var t = String(src || '').trim();
  if (!t) return '';
  if (t.indexOf('./') === 0) t = t.slice(2);
  var gh = t.match(/^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/]+)\/(?:blob|raw)\/([^/]+)\/(.+)$/i);
  if (gh) {
    var file = gh[4].split(/[?#]/)[0];
    return /^media\//i.test(file) ? file : 'https://raw.githubusercontent.com/' + gh[1] + '/' + gh[2] + '/' + gh[3] + '/' + file;
  }
  var raw = t.match(/^https?:\/\/raw\.githubusercontent\.com\/[^/]+\/[^/]+\/[^/]+\/(.+)$/i);
  if (raw && /^media\//i.test(raw[1])) return raw[1];
  return t;
}

function snRouteCat() {
  var hash = String(window.location.hash || '').replace(/^#\/?/, '');
  var m = hash.match(/^work\/([^?#]+)/);
  if (!m) return '';
  var slug = m[1].toLowerCase();
  for (var i = 0; i < SNEHAL_CATEGORIES.length; i++) {
    if (snSlug(SNEHAL_CATEGORIES[i]) === slug) return SNEHAL_CATEGORIES[i];
  }
  return '';
}

function snFeatured(category) {
  var list = snIn(category);
  for (var i = 0; i < list.length; i++) {
    if (list[i].featured) return list[i];
  }
  return list[0] || null;
}

function SnIcon(props) {
  var kind = props.kind;
  var size = props.size || 18;
  var base = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
    focusable: 'false',
  };
  if (kind === 'moon') {
    return (0, U.jsx)('svg', Object.assign({}, base, {
      children: (0, U.jsx)('path', { d: 'M20.8 14.6A8.6 8.6 0 1 1 9.4 3.2a6.8 6.8 0 0 0 11.4 11.4Z' }),
    }));
  }
  if (kind === 'sun') {
    return (0, U.jsxs)('svg', Object.assign({}, base, {
      children: [
        (0, U.jsx)('circle', { cx: '12', cy: '12', r: '4' }),
        (0, U.jsx)('path', { d: 'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4' }),
      ],
    }));
  }
  if (kind === 'play') {
    return (0, U.jsx)('svg', Object.assign({}, base, {
      fill: 'currentColor',
      stroke: 'none',
      children: (0, U.jsx)('path', { d: 'M8 5.2v13.6L19 12 8 5.2Z' }),
    }));
  }
  return (0, U.jsx)('svg', Object.assign({}, base, {
    children: (0, U.jsx)('path', { d: 'M7 17 17 7M9 7h8v8' }),
  }));
}

function SnTheme() {
  var state = (0, y.useState)(function () {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  });
  var theme = state[0];
  var setTheme = state[1];
  (0, y.useEffect)(function () {
    var root = document.documentElement;
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('snehal-theme', theme);
    } catch (err) {}
    var meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.setAttribute('content', theme);
    var color = document.querySelector('meta[name="theme-color"]');
    if (color) color.setAttribute('content', theme === 'light' ? '#f5ecd9' : '#101010');
  }, [theme]);
  var dark = theme === 'dark';
  return (0, U.jsxs)('button', {
    type: 'button',
    className: 'sn-theme-toggle',
    onClick: function () {
      setTheme(dark ? 'light' : 'dark');
    },
    'aria-label': dark ? 'Switch to light mode' : 'Switch to dark mode',
    'aria-pressed': dark ? 'true' : 'false',
    title: dark ? 'Switch to light mode' : 'Switch to dark mode',
    children: [
      (0, U.jsx)('span', { className: 'sn-theme-icon', children: (0, U.jsx)(SnIcon, { kind: dark ? 'sun' : 'moon', size: 15 }) }),
      (0, U.jsx)('span', { className: 'sn-theme-text', children: dark ? 'Light' : 'Dark' }),
    ],
  });
}

function SnCatCard(props) {
  var name = props.name;
  var count = props.count;
  var featured = props.featured;
  var index = props.index;
  var onOpen = props.onOpen;
  var thumb = featured ? snImg(featured.thumbnail) : '';
  return (0, U.jsxs)('button', {
    type: 'button',
    className: 'sn-cat-card' + (count ? '' : ' sn-cat-card-empty'),
    onClick: onOpen,
    'aria-label': count
      ? 'Explore ' + name + ' — ' + count + (count === 1 ? ' project' : ' projects')
      : name + ' — projects coming soon',
    children: [
      (0, U.jsxs)('span', {
        className: 'sn-cat-media',
        children: [
          thumb
            ? (0, U.jsx)('img', {
                className: 'sn-cat-img',
                src: thumb,
                alt: '',
                loading: 'lazy',
                decoding: 'async',
                onError: function (ev) {
                  ev.currentTarget.style.display = 'none';
                },
              })
            : (0, U.jsx)('span', { className: 'sn-cat-glow', 'aria-hidden': 'true' }),
          (0, U.jsx)('span', { className: 'sn-cat-play', 'aria-hidden': 'true', children: (0, U.jsx)(SnIcon, { kind: 'play', size: 16 }) }),
        ],
      }),
      (0, U.jsxs)('span', {
        className: 'sn-cat-body',
        children: [
          (0, U.jsxs)('span', {
            className: 'sn-cat-top',
            children: [
              (0, U.jsxs)('span', { className: 'sn-cat-index', children: [String(index + 1).padStart(2, '0'), ' / 05'] }),
              (0, U.jsx)('span', {
                className: 'sn-cat-count',
                children: count ? String(count).padStart(2, '0') + (count === 1 ? ' PROJECT' : ' PROJECTS') : 'COMING SOON',
              }),
            ],
          }),
          (0, U.jsx)('span', { className: 'sn-cat-name', children: name }),
          (0, U.jsx)('span', {
            className: 'sn-cat-sub',
            children: count ? (featured && featured.title ? 'Featured: ' + featured.title : 'Explore the collection') : 'New work dropping soon',
          }),
          (0, U.jsx)('span', { className: 'sn-cat-arrow', 'aria-hidden': 'true', children: (0, U.jsx)(SnIcon, { kind: 'arrow', size: 16 }) }),
        ],
      }),
    ],
  });
}

function SnWork() {
  var catState = (0, y.useState)(snRouteCat());
  var cat = catState[0];
  var setCat = catState[1];
  var openState = (0, y.useState)(null);
  var open = openState[0];
  var setOpen = openState[1];

  (0, y.useEffect)(function () {
    var onHash = function () {
      setCat(snRouteCat());
    };
    window.addEventListener('hashchange', onHash);
    return function () {
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  (0, y.useEffect)(function () {
    if (snRouteCat()) {
      var el = document.getElementById('work');
      if (el) window.setTimeout(function () {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }, []);

  var projects = cat ? snIn(cat) : [];
  var total = snProjects().length;
  var back = function () {
    window.location.hash = 'work';
  };
  var go = function (name) {
    window.location.hash = 'work/' + snSlug(name);
  };

  return (0, U.jsxs)(U.Fragment, {
    children: [
      (0, U.jsxs)('div', {
        className: 'section-kicker',
        children: [
          (0, U.jsx)('span', { children: '01 / EXPLORE MY WORK' }),
          (0, U.jsx)('span', {
            children: cat ? 'CATEGORY — ' + cat.toUpperCase() : 'FIVE COLLECTIONS — ' + String(total).padStart(2, '0') + ' PROJECTS',
          }),
        ],
      }),
      (0, U.jsxs)('div', {
        className: 'section-heading-row',
        children: [
          (0, U.jsxs)('div', {
            children: [
              (0, U.jsx)('p', { className: 'eyebrow', children: cat ? 'A COLLECTION OF MOVING PICTURES' : 'FIVE COLLECTIONS, ONE TIMELINE' }),
              cat
                ? (0, U.jsxs)('h2', {
                    className: 'sn-cat-title',
                    children: [
                      cat,
                      (0, U.jsxs)('sup', { children: ['(', String(projects.length).padStart(2, '0'), ')'] }),
                    ],
                  })
                : (0, U.jsxs)('h2', {
                    children: [
                      'Explore ',
                      (0, U.jsx)('span', { children: 'My Work' }),
                      (0, U.jsxs)('sup', { children: ['(', '05', ')'] }),
                    ],
                  }),
            ],
          }),
          (0, U.jsx)('p', {
            className: 'section-intro',
            children: cat
              ? 'Every project in this collection, gathered in one place. Choose any card to play it.'
              : 'Five collections — cinematic cuts, short-form reels, travel films, colour work and creative experiments.',
          }),
        ],
      }),
      cat
        ? (0, U.jsxs)(U.Fragment, {
            children: [
              (0, U.jsxs)('button', {
                type: 'button',
                className: 'sn-back',
                onClick: back,
                children: [(0, U.jsx)('span', { 'aria-hidden': 'true', children: '←' }), 'All categories'],
              }),
              projects.length
                ? (0, U.jsx)('div', {
                    className: 'project-grid sn-project-grid',
                    children: projects.map(function (p, i) {
                      return (0, U.jsx)(
                        Jd,
                        {
                          project: p,
                          index: i,
                          onOpen: function () {
                            setOpen(p);
                          },
                        },
                        p.id || String(i)
                      );
                    }),
                  })
                : (0, U.jsxs)('div', {
                    className: 'sn-empty',
                    children: [
                      (0, U.jsx)('span', { className: 'sn-empty-mark', 'aria-hidden': 'true', children: '◍' }),
                      (0, U.jsx)('h3', { children: 'This collection is still in the edit.' }),
                      (0, U.jsx)('p', { children: 'New work lands here soon. In the meantime, explore the other collections.' }),
                      (0, U.jsx)('button', { type: 'button', className: 'sn-back', onClick: back, children: 'Back to all categories' }),
                    ],
                  }),
            ],
          })
        : (0, U.jsx)('div', {
            className: 'sn-cat-grid',
            children: SNEHAL_CATEGORIES.map(function (name, i) {
              return (0, U.jsx)(
                SnCatCard,
                {
                  name: name,
                  index: i,
                  count: snIn(name).length,
                  featured: snFeatured(name),
                  onOpen: function () {
                    go(name);
                  },
                },
                name
              );
            }),
          }),
      (0, U.jsx)(nu, {
        children: open
          ? (0, U.jsx)(
              qd,
              {
                project: open,
                onClose: function () {
                  setOpen(null);
                },
              },
              open.id || open.title
            )
          : null,
      }),
    ],
  });
}

function SnEnquiry() {
  var formState = (0, y.useState)({ name: '', email: '', service: '', details: '' });
  var form = formState[0];
  var setForm = formState[1];
  var errState = (0, y.useState)({});
  var errors = errState[0];
  var setErrors = errState[1];
  var sentState = (0, y.useState)('');
  var sent = sentState[0];
  var setSent = sentState[1];

  var update = function (key) {
    return function (ev) {
      var next = Object.assign({}, form);
      next[key] = ev.target.value;
      setForm(next);
      if (errors[key]) {
        var cleared = Object.assign({}, errors);
        delete cleared[key];
        setErrors(cleared);
      }
    };
  };

  var services = ['Cinematic Editing', 'Reels & Short-Form Content', 'Travel Video Editing', 'Colour Grading', 'Other'];

  var submit = function (ev) {
    ev.preventDefault();
    var next = {};
    if (!form.name.trim()) next.name = 'Please add your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Please add a valid email address.';
    if (!form.service) next.service = 'Please choose the service you need.';
    if (form.details.trim().length < 10) next.details = 'Please share a little more detail (10 characters or more).';
    setErrors(next);
    var keys = Object.keys(next);
    if (keys.length) {
      var first = document.getElementById('sn-field-' + keys[0]);
      if (first) first.focus();
      return;
    }
    var message =
      'Hello Snehal!\n\n' +
      'I would like to enquire about your video editing services.\n\n' +
      'Name: ' + form.name.trim() + '\n' +
      'Email: ' + form.email.trim() + '\n' +
      'Service Required: ' + form.service + '\n\n' +
      'Project Details:\n' + form.details.trim() + '\n\n' +
      'Looking forward to discussing my project with you!';
    var url = 'https://wa.me/918690946334?text=' + encodeURIComponent(message);
    setSent(url);
    var win = window.open(url, '_blank', 'noopener');
    if (!win) window.location.href = url;
  };

  var field = function (key, label, node, hint) {
    return (0, U.jsxs)('div', {
      className: 'sn-field' + (errors[key] ? ' sn-field-error' : ''),
      children: [
        (0, U.jsx)('label', { htmlFor: 'sn-field-' + key, children: label }),
        node,
        (0, U.jsx)('span', {
          className: 'sn-error',
          id: 'sn-error-' + key,
          role: errors[key] ? 'alert' : undefined,
          children: errors[key] || hint || '',
        }),
      ],
    });
  };

  return (0, U.jsxs)('div', {
    className: 'sn-enquiry',
    children: [
      (0, U.jsxs)('div', {
        className: 'sn-enquiry-head',
        children: [
          (0, U.jsx)('p', { className: 'eyebrow', children: 'START AN ENQUIRY' }),
          (0, U.jsx)('h3', { children: 'Tell me about your project.' }),
          (0, U.jsx)('p', {
            className: 'sn-enquiry-lede',
            children: 'Share a few details and your message opens in WhatsApp, ready to send. You press Send there — nothing is sent automatically.',
          }),
        ],
      }),
      (0, U.jsxs)('form', {
        className: 'sn-form',
        onSubmit: submit,
        noValidate: true,
        children: [
          field(
            'name',
            'Full name',
            (0, U.jsx)('input', {
              id: 'sn-field-name',
              name: 'name',
              type: 'text',
              autoComplete: 'name',
              value: form.name,
              onChange: update('name'),
              placeholder: 'Your full name',
              'aria-invalid': errors.name ? 'true' : 'false',
              'aria-describedby': 'sn-error-name',
            })
          ),
          field(
            'email',
            'Email address',
            (0, U.jsx)('input', {
              id: 'sn-field-email',
              name: 'email',
              type: 'email',
              autoComplete: 'email',
              value: form.email,
              onChange: update('email'),
              placeholder: 'you@example.com',
              'aria-invalid': errors.email ? 'true' : 'false',
              'aria-describedby': 'sn-error-email',
            })
          ),
          field(
            'service',
            'Service required',
            (0, U.jsxs)('select', {
              id: 'sn-field-service',
              name: 'service',
              value: form.service,
              onChange: update('service'),
              'aria-invalid': errors.service ? 'true' : 'false',
              'aria-describedby': 'sn-error-service',
              children: [
                (0, U.jsx)('option', { value: '', children: 'Select a service' }),
                services.map(function (s) {
                  return (0, U.jsx)('option', { value: s, children: s }, s);
                }),
              ],
            })
          ),
          (0, U.jsxs)('div', {
            className: 'sn-field sn-field-wide' + (errors.details ? ' sn-field-error' : ''),
            children: [
              (0, U.jsx)('label', { htmlFor: 'sn-field-details', children: 'Project details' }),
              (0, U.jsx)('textarea', {
                id: 'sn-field-details',
                name: 'details',
                rows: 4,
                value: form.details,
                onChange: update('details'),
                placeholder: 'What are we editing? Footage length, deadline, references…',
                'aria-invalid': errors.details ? 'true' : 'false',
                'aria-describedby': 'sn-error-details',
              }),
              (0, U.jsx)('span', { className: 'sn-error', id: 'sn-error-details', role: errors.details ? 'alert' : undefined, children: errors.details || '' }),
            ],
          }),
          (0, U.jsxs)('div', {
            className: 'sn-form-actions',
            children: [
              (0, U.jsx)('button', { type: 'submit', className: 'sn-submit', children: 'Send enquiry on WhatsApp ↗' }),
              (0, U.jsx)('p', {
                className: 'sn-form-note',
                children: 'Opens WhatsApp with your message filled in. You always press Send yourself.',
              }),
            ],
          }),
          sent
            ? (0, U.jsxs)('div', {
                className: 'sn-success',
                role: 'status',
                'aria-live': 'polite',
                children: [
                  (0, U.jsx)('strong', { children: 'WhatsApp is opening with your enquiry.' }),
                  (0, U.jsx)('span', {
                    children: ' Press Send in WhatsApp to deliver it. If the tab was blocked, use the link below.',
                  }),
                  (0, U.jsx)('a', { href: sent, target: '_blank', rel: 'noopener noreferrer', children: 'Open WhatsApp manually ↗' }),
                ],
              })
            : null,
        ],
      }),
    ],
  });
}
