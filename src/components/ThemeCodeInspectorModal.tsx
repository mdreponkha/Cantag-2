import React, { useState } from 'react';
import { X, Code, FileCode, Folder, Copy, Check, Download, ExternalLink, ShieldCheck } from 'lucide-react';

interface ThemeCodeInspectorModalProps {
  onClose: () => void;
}

export const ThemeCodeInspectorModal: React.FC<ThemeCodeInspectorModalProps> = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState<string>('style.css');
  const [copied, setCopied] = useState(false);

  const fileManifest: Record<string, { label: string; group: string; desc: string; sample: string }> = {
    'style.css': {
      label: 'style.css',
      group: 'Core Theme Headers',
      desc: 'WordPress Theme Declaration Header, CSS Variables & Core Styling',
      sample: `/*
Theme Name: Canstar Power Tech
Theme URI: https://canstarpowertech.com/
Author: Canstar Power Tech Engineering Team
Author URI: https://canstarpowertech.com/
Description: Complete, modern, high-performance WordPress & Elementor Theme for Canstar Power Tech. Engineered for industrial power generation, diesel/gas/biogas generator sales, synchronization engineering, and turnkey lifecycle maintenance.
Version: 1.0.0
Tested up to: 6.6
Requires PHP: 7.4
License: GNU General Public License v2 or later
Text Domain: canstar-power-tech
*/

:root {
  --cpt-primary: #0A192F;
  --cpt-primary-dark: #060D1A;
  --cpt-secondary: #0F3460;
  --cpt-accent: #E5A93C;
  --cpt-accent-hover: #D49326;
  --cpt-bg-light: #F8FAFC;
  --cpt-text-dark: #0F172A;
  --cpt-font-heading: 'Outfit', sans-serif;
  --cpt-font-body: 'Plus Jakarta Sans', sans-serif;
}`
    },
    'functions.php': {
      label: 'functions.php',
      group: 'Core Setup & Enqueues',
      desc: 'Theme Setup, Asset Enqueues, Nav Menus, Widgets & AJAX Quote Handlers',
      sample: `<?php
/**
 * Canstar Power Tech Theme Functions and Definitions
 *
 * @package Canstar_Power_Tech
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'CANSTAR_VERSION', '1.0.0' );
define( 'CANSTAR_DIR', get_template_directory() );
define( 'CANSTAR_URI', get_template_directory_uri() );

// 1. Theme Setup
function canstar_power_tech_setup() {
	load_theme_textdomain( 'canstar-power-tech', CANSTAR_DIR . '/languages' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'elementor' );

	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Header Menu', 'canstar-power-tech' ),
		'footer'  => esc_html__( 'Footer Navigation Menu', 'canstar-power-tech' ),
	) );
}
add_action( 'after_setup_theme', 'canstar_power_tech_setup' );

// 2. Include Modular Components
require_once CANSTAR_DIR . '/inc/custom-post-types.php';
require_once CANSTAR_DIR . '/inc/customizer.php';
require_once CANSTAR_DIR . '/inc/elementor-support.php';`
    },
    'header.php': {
      label: 'header.php',
      group: 'Layout Templates',
      desc: 'Top Emergency Bar, Brand Navigation, Mobile Drawer & Sticky Header',
      sample: `<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<!-- Top Emergency Dispatch Notification Bar -->
	<div class="cpt-topbar">
		<div class="cpt-container cpt-topbar__inner">
			<div class="cpt-topbar__left">
				<span class="cpt-topbar__item"><span class="cpt-icon-dot"></span> <strong>24/7 Field Service:</strong> <?php echo esc_html( get_theme_mod( 'canstar_emergency_phone', '+880 1819-000000' ) ); ?></span>
			</div>
			<div class="cpt-topbar__right">
				<span class="cpt-tag-certified">ISO 8528 & CE Compliant</span>
			</div>
		</div>
	</div>`
    },
    'footer.php': {
      label: 'footer.php',
      group: 'Layout Templates',
      desc: 'Pre-Footer Call-To-Action, 4-Column Directory & Script Enqueues',
      sample: `	<footer id="colophon" class="cpt-footer">
		<div class="cpt-container">
			<div class="cpt-footer__grid">
				<div class="cpt-footer__col-brand">
					<div class="cpt-brand-name">CANSTAR POWER TECH</div>
					<p class="cpt-footer-desc"><?php echo esc_html( get_theme_mod( 'canstar_footer_text', 'Leading provider of turnkey power generation, diesel & gas generators, and lifecycle maintenance.' ) ); ?></p>
				</div>
				<!-- Navigation & Contact Columns -->
			</div>
			<div class="cpt-footer__bottom">
				<div class="cpt-footer__bottom-inner">
					<p>&copy; <?php echo date( 'Y' ); ?> Canstar Power Tech. All rights reserved.</p>
				</div>
			</div>
		</div>
	</footer>
</div><!-- #page -->
<?php wp_footer(); ?>
</body>
</html>`
    },
    'inc/custom-post-types.php': {
      label: 'inc/custom-post-types.php',
      group: 'Custom Post Types',
      desc: 'Registers Products (Generators), Services, Projects, Clients, and Testimonials CPTs',
      sample: `<?php
/**
 * Custom Post Types Registration
 * Products (cpt_product), Services (cpt_service), Projects (cpt_project), Clients (cpt_client)
 */

function canstar_register_cpts() {
	// 1. Products / Generators
	register_post_type( 'cpt_product', array(
		'labels' => array(
			'name' => __( 'Power Generators & Products', 'canstar-power-tech' ),
			'singular_name' => __( 'Product', 'canstar-power-tech' ),
		),
		'public' => true,
		'has_archive' => true,
		'rewrite' => array( 'slug' => 'power-products' ),
		'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
		'menu_icon' => 'dashicons-performance',
		'show_in_rest' => true,
	) );

	// 2. Turnkey Engineering Projects
	register_post_type( 'cpt_project', array(
		'labels' => array(
			'name' => __( 'Projects & Case Studies', 'canstar-power-tech' ),
			'singular_name' => __( 'Project', 'canstar-power-tech' ),
		),
		'public' => true,
		'has_archive' => true,
		'rewrite' => array( 'slug' => 'projects' ),
		'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
		'menu_icon' => 'dashicons-building',
		'show_in_rest' => true,
	) );
}
add_action( 'init', 'canstar_register_cpts' );`
    },
    'inc/elementor-support.php': {
      label: 'inc/elementor-support.php',
      group: 'Elementor Integration',
      desc: 'Creates "Canstar Power Tech Widgets" Category & Registers Custom Widgets',
      sample: `<?php
/**
 * Elementor Page Builder Integration
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Canstar_Elementor_Extension {
	public function init() {
		add_action( 'elementor/elements/categories_registered', array( $this, 'add_elementor_widget_categories' ) );
		add_action( 'elementor/widgets/register', array( $this, 'register_widgets' ) );
	}

	public function add_elementor_widget_categories( $elements_manager ) {
		$elements_manager->add_category(
			'canstar-elements',
			array(
				'title' => esc_html__( 'Canstar Power Tech Widgets', 'canstar-power-tech' ),
				'icon'  => 'fa fa-bolt',
			)
		);
	}

	public function register_widgets( $widgets_manager ) {
		require_once CANSTAR_DIR . '/elementor/widgets/hero-banner.php';
		require_once CANSTAR_DIR . '/elementor/widgets/stats-counter.php';
		require_once CANSTAR_DIR . '/elementor/widgets/products-grid.php';
		require_once CANSTAR_DIR . '/elementor/widgets/services-grid.php';
		require_once CANSTAR_DIR . '/elementor/widgets/projects-grid.php';
		require_once CANSTAR_DIR . '/elementor/widgets/clients-grid.php';

		$widgets_manager->register( new \\Canstar_Hero_Banner_Widget() );
		$widgets_manager->register( new \\Canstar_Stats_Counter_Widget() );
		$widgets_manager->register( new \\Canstar_Products_Grid_Widget() );
		$widgets_manager->register( new \\Canstar_Services_Grid_Widget() );
		$widgets_manager->register( new \\Canstar_Projects_Grid_Widget() );
		$widgets_manager->register( new \\Canstar_Clients_Grid_Widget() );
	}
}`
    },
    'elementor/widgets/hero-banner.php': {
      label: 'elementor/widgets/hero-banner.php',
      group: 'Elementor Custom Widgets',
      desc: 'Custom Elementor Hero Banner Widget with Editable Headline, Badge, and CTAs',
      sample: `<?php
class Canstar_Hero_Banner_Widget extends \\Elementor\\Widget_Base {
	public function get_name() { return 'canstar_hero_banner'; }
	public function get_title() { return esc_html__( 'Canstar Hero Banner', 'canstar-power-tech' ); }
	public function get_icon() { return 'eicon-banner'; }
	public function get_categories() { return array( 'canstar-elements' ); }

	protected function register_controls() {
		$this->start_controls_section( 'content_section', array( 'label' => esc_html__( 'Hero Content', 'canstar-power-tech' ) ) );
		$this->add_control( 'headline', array(
			'label' => esc_html__( 'Main Headline', 'canstar-power-tech' ),
			'type' => \\Elementor\\Controls_Manager::TEXT,
			'default' => 'Reliable Power. Professional Solutions. Uninterrupted Performance.',
		) );
		$this->add_control( 'subheadline', array(
			'label' => esc_html__( 'Subheadline', 'canstar-power-tech' ),
			'type' => \\Elementor\\Controls_Manager::TEXTAREA,
			'default' => 'Leading turnkey supplier of heavy-duty industrial diesel, natural gas & biogas generators.',
		) );
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
		<div class="cpt-hero-section">
			<div class="cpt-container">
				<h1 class="cpt-hero-title"><?php echo esc_html( $settings['headline'] ); ?></h1>
				<p class="cpt-hero-desc"><?php echo esc_html( $settings['subheadline'] ); ?></p>
			</div>
		</div>
		<?php
	}
}`
    },
    'assets/css/theme-style.css': {
      label: 'assets/css/theme-style.css',
      group: 'Stylesheets & Assets',
      desc: 'Comprehensive Responsive CSS layout, components, cards, grid, and navigation',
      sample: `/*
 * Canstar Power Tech - Master Theme Stylesheet
 * Engineered with Dark Navy (#0A192F), Industrial Slate (#0F3460), Accent Gold (#E5A93C)
 */
.cpt-header {
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: rgba(10, 25, 47, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.cpt-product-card {
  background-color: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #E2E8F0;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}`
    },
    'assets/js/theme-main.js': {
      label: 'assets/js/theme-main.js',
      group: 'Stylesheets & Assets',
      desc: 'Frontend JavaScript for sticky header, mobile nav, AJAX quote submissions, and back to top',
      sample: `(function($) {
  'use strict';
  $(document).ready(function() {
    // Sticky Header
    $(window).on('scroll', function() {
      if ($(this).scrollTop() > 50) {
        $('#masthead').addClass('cpt-scrolled');
      } else {
        $('#masthead').removeClass('cpt-scrolled');
      }
    });

    // Mobile Drawer
    $('.cpt-mobile-toggle').on('click', function() {
      $('.cpt-mobile-menu').slideToggle(250);
    });
  });
})(jQuery);`
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fileManifest[selectedFile]?.sample || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl text-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                PRODUCTION WORDPRESS THEME
              </span>
              <h2 className="font-['Outfit'] font-black text-xl text-white">
                Theme Architecture & Source Code
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/canstar-power-tech.zip"
              download="canstar-power-tech.zip"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download ZIP (45 KB)</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Explorer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 min-h-[400px]">
          
          {/* File Tree Left */}
          <div className="md:col-span-4 bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-1 overflow-y-auto max-h-[450px]">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              /canstar-power-tech/
            </div>
            {Object.entries(fileManifest).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setSelectedFile(key)}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono transition flex items-center gap-2 cursor-pointer ${
                  selectedFile === key
                    ? 'bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Code Viewer Right */}
          <div className="md:col-span-8 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {selectedFile}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {fileManifest[selectedFile]?.desc}
                  </p>
                </div>

                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Code Pre Box */}
              <pre className="text-[11px] font-mono text-slate-200 bg-slate-900/90 p-3.5 rounded-lg border border-slate-800/80 overflow-x-auto max-h-[350px] leading-relaxed select-all">
                <code>{fileManifest[selectedFile]?.sample}</code>
              </pre>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Clean, standard WordPress coding standards & Elementor 3.0+ API</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
