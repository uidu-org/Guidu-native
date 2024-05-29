// tsup.config.ts
import { defineConfig } from "tsup";
var tsup_config_default = defineConfig((opts) => ({
  entry: ["./src/index.ts"],
  format: ["cjs", "esm"],
  minify: !opts.watch,
  clean: !opts.watch,
  dts: true,
  outDir: "dist",
  target: "es2019",
  banner: { js: '"use client";' }
}));
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiQzpcXFxcVXNlcnNcXFxcZ2lhY29tby5naW92YW5uZXR0aVxcXFxEZXNrdG9wXFxcXGFwcHNcXFxcQGd1aWR1LW5hdGl2ZVxcXFxHdWlkdS1uYXRpdmVcXFxccGFja2FnZXNcXFxcY29tcG9uZW50c1xcXFxjb3JlXFxcXGNhcm91c2VsXFxcXHRzdXAuY29uZmlnLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIkM6XFxcXFVzZXJzXFxcXGdpYWNvbW8uZ2lvdmFubmV0dGlcXFxcRGVza3RvcFxcXFxhcHBzXFxcXEBndWlkdS1uYXRpdmVcXFxcR3VpZHUtbmF0aXZlXFxcXHBhY2thZ2VzXFxcXGNvbXBvbmVudHNcXFxcY29yZVxcXFxjYXJvdXNlbFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vQzovVXNlcnMvZ2lhY29tby5naW92YW5uZXR0aS9EZXNrdG9wL2FwcHMvQGd1aWR1LW5hdGl2ZS9HdWlkdS1uYXRpdmUvcGFja2FnZXMvY29tcG9uZW50cy9jb3JlL2Nhcm91c2VsL3RzdXAuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndHN1cCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKG9wdHMpID0+ICh7XHJcbiAgZW50cnk6IFsnLi9zcmMvaW5kZXgudHMnXSxcclxuICBmb3JtYXQ6IFsnY2pzJywgJ2VzbSddLFxyXG4gIG1pbmlmeTogIW9wdHMud2F0Y2gsXHJcbiAgY2xlYW46ICFvcHRzLndhdGNoLFxyXG4gIGR0czogdHJ1ZSxcclxuICBvdXREaXI6ICdkaXN0JyxcclxuICB0YXJnZXQ6ICdlczIwMTknLFxyXG4gIGJhbm5lcjogeyBqczogJ1widXNlIGNsaWVudFwiOycgfSxcclxufSkpO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNkLFNBQVMsb0JBQW9CO0FBRW5mLElBQU8sc0JBQVEsYUFBYSxDQUFDLFVBQVU7QUFBQSxFQUNyQyxPQUFPLENBQUMsZ0JBQWdCO0FBQUEsRUFDeEIsUUFBUSxDQUFDLE9BQU8sS0FBSztBQUFBLEVBQ3JCLFFBQVEsQ0FBQyxLQUFLO0FBQUEsRUFDZCxPQUFPLENBQUMsS0FBSztBQUFBLEVBQ2IsS0FBSztBQUFBLEVBQ0wsUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUFBLEVBQ1IsUUFBUSxFQUFFLElBQUksZ0JBQWdCO0FBQ2hDLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
